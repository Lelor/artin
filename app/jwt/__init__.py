from flask import Blueprint, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, current_user
from app.models import User

from app.user.serializer import UserSchema
from app.utils import deserialize


# JWT Boilerplate

jwt = JWTManager()


@jwt.user_identity_loader
def user_identity_lookup(user):
    return user


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).one_or_none()


# JWT Routes

bp = Blueprint('jwt', __name__)


@bp.route('/login', methods=['POST'])
@deserialize(UserSchema(only=("password", "email")))
def login_route(data):
    usr = User.query.filter(User.email == data['email']).first()
    if usr and usr.check_password(data['password']):
        return jsonify(access_token=create_access_token(identity=usr.id))
    return 'não ok', 403


@bp.route('/whoami', methods=['GET'])
@jwt_required()
def whoami():
    return jsonify(current_user.given_name)