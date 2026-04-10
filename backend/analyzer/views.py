from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import ResumeAnalysis, RewriteSuggestion
from .serializers import ResumeAnalysisSerializer, ResumeAnalysisListSerializer
from .utils.extract_text import extract_text
from .utils.gemini import analyze_resume, rewrite_bullet


@api_view(['POST'])
@permission_classes([AllowAny])
@parser_classes([MultiPartParser, FormParser])
def analyze_view(request):
    """
    Main endpoint — receives resume file + job description,
    runs AI analysis, saves and returns the result.
    """
    # --- 1. Get data from request ---
    resume_file     = request.FILES.get('resume_file')
    job_description = request.data.get('job_description', '').strip()

    # --- 2. Validate inputs ---
    if not resume_file:
        return Response(
            {'error': 'Please upload a resume file'},
            status=status.HTTP_400_BAD_REQUEST
        )

    if not job_description:
        return Response(
            {'error': 'Please paste a job description'},
            status=status.HTTP_400_BAD_REQUEST
        )

    if len(job_description) < 50:
        return Response(
            {'error': 'Job description is too short — paste the full job description'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # --- 3. Extract text from PDF or DOCX ---
    try:
        resume_text = extract_text(resume_file, resume_file.name)
    except ValueError as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )

    # --- 4. Send to Gemini AI ---
    try:
        ai_result = analyze_resume(resume_text, job_description)
    except ValueError as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_503_SERVICE_UNAVAILABLE
        )

    # --- 5. Save to database ---
    # NOTE: We do NOT save the resume file to disk.
    # Vercel (and most serverless platforms) have a read-only filesystem,
    # so file uploads can't be persisted. We already have resume_text,
    # which is all we need for analysis.

    analysis = ResumeAnalysis.objects.create(
        user             = request.user if request.user.is_authenticated else None,
        resume_text      = resume_text,
        job_description  = job_description,
        match_score      = ai_result.get('match_score', 0),
        ats_score        = ai_result.get('ats_score', 0),
        missing_keywords = ai_result.get('missing_keywords', []),
        found_keywords   = ai_result.get('found_keywords', []),
        section_scores   = ai_result.get('section_scores', {}),
        feedback         = ai_result.get('feedback', {}),
        weak_bullets     = ai_result.get('weak_bullets', []),
    )

    # --- 6. Update user's analysis count ---
    if request.user.is_authenticated:
        request.user.analyses_count += 1
        request.user.save()

    # --- 7. Return result ---
    serializer = ResumeAnalysisSerializer(analysis)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def analyses_list_view(request):
    """
    Returns all analyses for the logged-in user.
    Used for dashboard and history.
    """
    analyses   = ResumeAnalysis.objects.filter(user=request.user)
    serializer = ResumeAnalysisListSerializer(analyses, many=True)
    return Response(serializer.data)


@api_view(['GET', 'DELETE'])
@permission_classes([AllowAny])
def analysis_detail_view(request, pk):
    """
    GET  — returns full analysis result
    DELETE — deletes the analysis
    """
    analysis = get_object_or_404(ResumeAnalysis, pk=pk)

    # security check — only owner can view or delete
    if analysis.user and request.user != analysis.user:
        return Response(
            {'error': 'You do not have permission to access this analysis'},
            status=status.HTTP_403_FORBIDDEN
        )

    if request.method == 'GET':
        serializer = ResumeAnalysisSerializer(analysis)
        return Response(serializer.data)

    if request.method == 'DELETE':
        analysis.delete()
        return Response(
            {'message': 'Analysis deleted successfully'},
            status=status.HTTP_204_NO_CONTENT
        )


@api_view(['POST'])
@permission_classes([AllowAny])
def rewrite_view(request):
    """
    Receives one weak bullet point + job description,
    returns AI rewritten version.
    Optionally saves to database if analysis_id is provided.
    """
    original_text   = request.data.get('original_text', '').strip()
    job_description = request.data.get('job_description', '').strip()
    analysis_id     = request.data.get('analysis_id')

    if not original_text:
        return Response(
            {'error': 'Please provide the bullet point text'},
            status=status.HTTP_400_BAD_REQUEST
        )

    if not job_description:
        return Response(
            {'error': 'Please provide the job description'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        rewritten = rewrite_bullet(original_text, job_description)
    except ValueError as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_503_SERVICE_UNAVAILABLE
        )

    # save to DB if analysis_id provided
    if analysis_id:
        try:
            analysis = ResumeAnalysis.objects.get(pk=analysis_id)
            RewriteSuggestion.objects.create(
                analysis       = analysis,
                original_text  = original_text,
                rewritten_text = rewritten,
            )
        except ResumeAnalysis.DoesNotExist:
            pass  # don't fail if analysis not found, just skip saving

    return Response({
        'original':  original_text,
        'rewritten': rewritten,
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_view(request):
    """
    Returns score history data for the chart.
    """
    analyses = ResumeAnalysis.objects.filter(
        user=request.user
    ).values('id', 'match_score', 'ats_score', 'created_at').order_by('created_at')

    return Response(list(analyses))