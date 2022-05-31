import os


class Development:
    SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://postgres:sensedata@localhost:5432/artin'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = 'banana' #os.urandom(16)
    JWT_ACCESS_TOKEN_EXPIRES=False