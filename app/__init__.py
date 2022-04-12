from flask import Flask
from flask_alembic import Alembic

from app.user import bp as user_bp
from app.jwt import jwt
from app.jwt import bp as jwt_bp
from app.models import db, ma


def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Development')
    db.init_app(app)
    ma.init_app(app)
    jwt.init_app(app)
    Alembic(app)
    app.register_blueprint(user_bp)
    app.register_blueprint(jwt_bp)
    return app