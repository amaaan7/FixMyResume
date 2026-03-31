from rest_framework import serializers
from .models import ResumeAnalysis, RewriteSuggestion


class RewriteSuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model  = RewriteSuggestion
        fields = ['id', 'original_text', 'rewritten_text', 'section', 'created_at']


class ResumeAnalysisSerializer(serializers.ModelSerializer):
    rewrites = RewriteSuggestionSerializer(many=True, read_only=True)

    class Meta:
        model  = ResumeAnalysis
        fields = [
            'id',
            'match_score',
            'ats_score',
            'missing_keywords',
            'found_keywords',
            'section_scores',
            'feedback',
            'weak_bullets',
            'rewrites',
            'created_at',
        ]


class ResumeAnalysisListSerializer(serializers.ModelSerializer):
    """
    Lighter serializer for listing analyses —
    no feedback or keywords, just the scores and date.
    Used in dashboard and history list.
    """
    class Meta:
        model  = ResumeAnalysis
        fields = ['id', 'match_score', 'ats_score', 'created_at']