from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash


ma = Marshmallow()
db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    given_name = db.Column(db.String(30), nullable=False)
    family_name = db.Column(db.String(80), nullable=False)
    type = db.Column(db.String(10))
    birth_date = db.Column(db.Date)
    address = db.Column(db.String(120))
    picture = db.Column(db.String(120))
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    modality_id = db.Column(db.Integer, db.ForeignKey('modality.id'))
    place_id = db.Column(db.Integer, db.ForeignKey('place.id'))

    def __init__(self, username, password, email, given_name, family_name):
        self.given_name = given_name
        self.family_name = family_name
        self.username = username
        self.password = generate_password_hash(password)
        self.email = email
    
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
    cost = db.Column(db.Float)
    comments = db.Column(db.Text)
    modality_id = db.Column(db.Integer, db.ForeignKey('modality.id'))


class Place(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    type = db.Column(db.String(20), nullable=False)
    picture = db.Column(db.String(50))
    description = db.Column(db.Text, nullable=False)
    address = db.Column(db.String(120))
    activity_id = db.Column(db.Integer, db.ForeignKey('activity.id'))