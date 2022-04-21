from flask import Blueprint, jsonify
from sqlalchemy.exc import IntegrityError

from app.user.serializer import UserSchema
from app.utils import deserialize
from app.models import User, db


bp = Blueprint('user', __name__, url_prefix='/user')


@bp.route('/new', methods=['POST'])
@deserialize(UserSchema())
def new_user_route(data):
    try:
        usr = User(
            given_name=data['given_name'],
            family_name=data['family_name'],
            username=data['username'],
            password=data['password'],
            email=data['email']
        )
        db.session.add(usr)
        db.session.flush()
        db.session.commit()
        return jsonify(user_id=usr.id)
    except IntegrityError as err:
        msg = 'User already registered'
        return jsonify(error=msg), 409