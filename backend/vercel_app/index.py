import os
from django.core.wsgi import get_wsgi_application

# Set the Django settings module for Vercel's serverless environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_project.settings")

# Expose the WSGI application as 'app' for Vercel
app = get_wsgi_application()
