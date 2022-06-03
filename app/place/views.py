from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, current_user

from app.place.serializer import PlaceSchema
from app.utils import deserialize
from app.models import Place, db


bp = Blueprint('place', __name__, url_prefix='/place')


@bp.route('/new', methods=['POST'])
@jwt_required()
@deserialize(PlaceSchema())
def new_place_route(data):
    try:
        place = Place(
            name=data['name'],
            description=data['description'],
            image=data['image'],
            address=data['address'],
            modalities=data['modalities'],
            created_by=current_user.id
        )
        db.session.add(place)
        db.session.flush()
        db.session.commit()
        return jsonify(user_id=place.id), 201
    except Exception as err:
        raise


@bp.route('/list', methods=['GET'])
@jwt_required()
def list_user_activities():
    try:
        places = Place.query.all()
        return jsonify({'places': [
            {
                'id': pl.id,
                'description': pl.description,
                'address': pl.address,
                'image': pl.image,
                'name': pl.name,
                'modalities': pl.modalities
            } for pl in places
        ]})
    except Exception as err:
        raise