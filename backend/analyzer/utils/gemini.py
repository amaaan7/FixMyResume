from google import genai
import os
import json
import re

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def analyze_resume(resume_text, job_description):
    prompt = f"""
You are an expert ATS (Applicant Tracking System) analyst and career coach.

Analyze the resume below against the job description and return ONLY a valid JSON object.
No markdown, no code blocks, no explanation — just raw JSON.

Return exactly this structure:
{{
    "match_score": <integer 0-100>,
    "ats_score": <integer 0-100>,
    "missing_keywords": ["keyword1", "keyword2"],
    "found_keywords": ["keyword1", "keyword2"],
    "section_scores": {{
        "summary": <integer 0-100>,
        "skills": <integer 0-100>,
        "experience": <integer 0-100>,
        "education": <integer 0-100>
    }},
    "feedback": {{
        "summary": "<specific feedback>",
        "skills": "<specific feedback>",
        "experience": "<specific feedback>",
        "education": "<specific feedback>",
        "overall": "<overall recommendation>"
    }},
    "weak_bullets": [
        {{
            "original": "<original bullet point text>",
            "issue": "<why this bullet is weak>"
        }}
    ]
}}

Scoring guide:
- match_score: How well the resume matches this specific job description
- ats_score: How ATS-friendly the resume is (formatting, keywords, structure)
- section scores: Rate each section independently

RESUME:
{resume_text}

JOB DESCRIPTION:
{job_description}
"""

    try:
        response = client.models.generate_content(
            model="gemini-3.1-flash-lite-preview",
            contents=prompt
        )
        raw_text = response.text.strip()

        # Remove markdown code blocks if Gemini adds them
        raw_text = re.sub(r'```json\s*', '', raw_text)
        raw_text = re.sub(r'```\s*', '', raw_text)
        raw_text = raw_text.strip()

        result = json.loads(raw_text)
        return result

    except json.JSONDecodeError:
        raise ValueError("Gemini returned invalid JSON — try again")
    except Exception as e:
        raise ValueError(f"Gemini API error: {str(e)}")


def rewrite_bullet(original_text, job_description):
    prompt = f"""
You are an expert resume writer.

Rewrite the following weak resume bullet point to make it:
- Start with a strong action verb
- Include measurable impact where possible
- Be concise (one line)
- Be relevant to this job description

Return ONLY the rewritten bullet point. No explanation, no quotes, no extra text.

Original bullet: {original_text}

Job description context: {job_description[:500]}
"""

    try:
        response = client.models.generate_content(
            model="gemini-3.1-flash-lite-preview",
            contents=prompt
        )
        return response.text.strip()
    except Exception as e:
        raise ValueError(f"Gemini API error: {str(e)}")

