from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy import func
from werkzeug.security import generate_password_hash, check_password_hash


ma = Marshmallow()
db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    biography = db.Column(db.Text)
    birth_date = db.Column(db.DateTime)
    address = db.Column(db.String(120))
    image = db.Column(db.Text)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __init__(self, username, password, email, name, biography, birth_date, image, address):
        self.image = image
        self.birth_date = birth_date
        self.biography = biography
        self.name = name
        self.username = username
        self.password = generate_password_hash(password)
        self.email = email
        self.address = address
    
    def check_password(self, password):
        return check_password_hash(self.password, password)


class Modality(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(50))


class Activity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(20), nullable=False)
    description = db.Column(db.Text)
    address = db.Column(db.String(50), nullable=False)
    level = db.Column(db.String(50))
    max_capacity = db.Column(db.Integer, nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    interval = db.Column(db.String(20))
    cost = db.Column(db.String(20))
    comments = db.Column(db.Text)
    place_id = db.Column(db.Integer, db.ForeignKey('place.id'))
    image = db.Column(db.Text)
    created_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    title = db.Column(db.String(60))


class Place(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    image = db.Column(db.Text)
    description = db.Column(db.Text, nullable=False)
    address = db.Column(db.String(120))
    modalities = db.Column(JSON)
    created_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)


class UserActivity(db.Model):
    __table_args__ = (
        db.UniqueConstraint('user_id', 'activity_id'),
    )
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    activity_id = db.Column(db.Integer, db.ForeignKey('activity.id'), nullable=False)
