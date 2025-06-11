from ChatbotWebsite import create_app
import os

# Create the app
app = create_app()

# For Vercel serverless deployment
if __name__ == '__main__':
    # Local development
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
else:
    # Production (Vercel)
    app = app
