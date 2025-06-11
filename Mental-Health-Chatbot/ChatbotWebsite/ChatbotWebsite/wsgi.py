import os
import sys
from django.core.wsgi import get_wsgi_application

# Add the project directory to the Python path
path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if path not in sys.path:
    sys.path.append(path)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ChatbotWebsite.settings')

# Initialize Django application
application = get_wsgi_application()

# Vercel serverless handler
app = application 