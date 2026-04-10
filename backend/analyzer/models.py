from django.db import models
from django.conf import settings


class ResumeAnalysis(models.Model):
    # who made this analysis — nullable so guest users can analyze too
    user             = models.ForeignKey(
                           settings.AUTH_USER_MODEL,
                           on_delete=models.CASCADE,
                           null=True,
                           blank=True,
                           related_name='analyses'
                       )

    # extracted plain text from the resume
    resume_text      = models.TextField()

    # job description pasted by user
    job_description  = models.TextField()

    # scores from Gemini (0-100)
    match_score      = models.IntegerField(default=0)
    ats_score        = models.IntegerField(default=0)

    # keywords stored as JSON lists
    missing_keywords = models.JSONField(default=list)
    found_keywords   = models.JSONField(default=list)

    # per-section scores: {"summary": 70, "skills": 85, ...}
    section_scores   = models.JSONField(default=dict)

    # per-section feedback text
    feedback         = models.JSONField(default=dict)

    # weak bullet points identified by Gemini
    weak_bullets     = models.JSONField(default=list)

    created_at       = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']  # newest first

    def __str__(self):
        user_str = self.user.email if self.user else "Guest"
        return f"{user_str} — {self.match_score}% match — {self.created_at.strftime('%d %b %Y')}"


class RewriteSuggestion(models.Model):
    # which analysis this rewrite belongs to
    analysis         = models.ForeignKey(
                           ResumeAnalysis,
                           on_delete=models.CASCADE,
                           related_name='rewrites'
                       )

    original_text    = models.TextField()
    rewritten_text   = models.TextField()
    section          = models.CharField(max_length=50, default='experience')
    created_at       = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Rewrite for analysis {self.analysis.id}"