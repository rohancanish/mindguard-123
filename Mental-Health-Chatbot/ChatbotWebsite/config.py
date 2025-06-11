import os

class Config:
    DEBUG = False
    SECRET_KEY = os.environ.get("SECRET_KEY", "devsecretkey")
    # Use SQLite for Vercel deployment
    SQLALCHEMY_DATABASE_URI = 'sqlite:///users.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MAIL_SERVER = "smtp.gmail.com"
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_USERNAME = os.environ.get("MAIL_USERNAME")
    MAIL_PASSWORD = os.environ.get("MAIL_PASSWORD")
