import json
from flask import Blueprint, jsonify, abort
from flask_jwt_extended import jwt_required, current_user
from sqlalchemy import delete

from app.place.serializer import PlaceSchema
from app.utils import deserialize, validate
from app.models import Place, Activity, UserActivity, db


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


@bp.route('/<int:place_id>/delete', methods=['POST'])
@jwt_required()
def delete_place(place_id):
    query = f"""
    begin;
        delete from user_activity ua
        using activity a
        where a.place_id = {place_id};
        delete from activity where place_id = {place_id};
        delete from place where id = {place_id};
    commit;
    """
    try:
        place = Place.query.get(place_id)
        if current_user.id is not place.created_by:
            abort(403)
        db.session.execute(query)
        return jsonify(success=True), 200
    except Exception as e:
        raise


@bp.route('/<int:place_id>/update', methods=['POST'])
@jwt_required()
def update_place_route(place_id):
    data = validate(PlaceSchema())
    try:
        place = Place.query.get(place_id)
        if not place.created_by == current_user.id:
            abort(403)
        place.name=data['name'],
        place.description=data['description'],
        place.image=data['image'],
        place.address=data['address'],
        place.modalities=data['modalities'],

        db.session.commit()
        return jsonify(user_id=place.id), 201
    except Exception as err:
        raise


@bp.route('/list', methods=['GET'])
@jwt_required()
def list_places():
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


@bp.route('/<int:place_id>/activities', methods=['GET'])
@jwt_required()
def list_place_activities(place_id):
    activities = Activity.query\
        .join(Place, Place.id == Activity.place_id)\
        .filter(Place.id == place_id)
    return jsonify({'activities': [{
        'id': ac.id,
        'type': ac.type,
        'description': ac.description,
        'address': ac.address,
        'max_capacity': ac.max_capacity,
        'start_date': ac.start_date,
        'image': ac.image,
        'title': ac.title,
        'is_favorite': True,
        'cost': ac.cost,
        'place': ac.place_id,
        'interval': ac.interval,
        'level': ac.level} for ac in activities]})


@bp.route('/list/user', methods=['GET'])
@jwt_required()
def list_user_places():
    try:
        places = Place.query.filter(Place.created_by == current_user.id)
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
