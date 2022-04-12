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
            data['username'],
            data['password'],
            data['email']
        )
        db.session.add(usr)
        db.session.flush()
        db.session.commit()
        return jsonify(user_id=usr.id)
    except IntegrityError as err:
        msg = err._message().split('\n')[1]
        return jsonify(conflict=msg), 409