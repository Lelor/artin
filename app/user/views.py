from flask import Blueprint, jsonify
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import jwt_required, current_user

from app.user.serializer import UserSchema
from app.utils import deserialize, validate
from app.models import User, db


bp = Blueprint('user', __name__, url_prefix='/user')


@bp.route('/new', methods=['POST'])
@deserialize(UserSchema())
def new_user_route(data):
    try:
        usr = User(
            name=data['name'],
            biography=data['biography'],
            username=data['email'],
            password=data['password'],
            email=data['email'],
            birth_date=data.get('birth_date'),
            image=data.get('image'),
            address=data['address']
        )
        db.session.add(usr)
        db.session.flush()
        db.session.commit()
        return jsonify(user_id=usr.id)
    except IntegrityError as err:
        msg = 'User already registered'
        return jsonify(error=msg), 409


@bp.route('/update', methods=['POST'])
@jwt_required()
def update_user_route():
    data = validate(UserSchema(only=('image', 'name', 'birth_date', 'biography', 'address')))
    try:
        usr = current_user
        usr.name = data['name']
        usr.biography = data['biography']
        # usr.email = data['email']
        usr.birth_date = data['birth_date']
        usr.image = data['image']
        db.session.commit()
        return jsonify(user_id=usr.id)
    except IntegrityError as err:
        raise