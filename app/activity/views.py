from flask import Blueprint, jsonify, abort
from flask_jwt_extended import jwt_required, current_user

from app.activity.serializer import ActivitySchema
from app.utils import deserialize, validate
from app.models import Activity, db


bp = Blueprint('activity', __name__, url_prefix='/activity')


@bp.route('/new', methods=['POST'])
@jwt_required()
@deserialize(ActivitySchema())
def new_user_route(data):
    try:
        activity = Activity(
            type=data['type'],
            description=data['description'],
            max_capacity=data['max_capacity'],
            address=data['address'],
            start_date=data['start_date'],
            end_date=data['start_date'],
            image=data['image'],
            created_by=current_user.id
        )
        db.session.add(activity)
        db.session.flush()
        db.session.commit()
        return jsonify(user_id=activity.id), 201
    except Exception as err:
        raise


@bp.route('/<int:activity_id>/update', methods=['POST'])
@jwt_required()
def update_activity(activity_id):
    data = validate(ActivitySchema())
    try:
        activity = Activity.query.get(activity_id)
        if current_user.id is not activity.created_by:
            abort(403)
        activity.type = data['type']
        activity.description = data['description']
        activity.max_capacity = data['max_capacity']
        activity.address = data['address']
        activity.start_date = data['start_date']
        activity.image = data['image']
        db.session.commit()
        return {'activity': activity.id}, 200
    except Exception as err:
        raise


@bp.route('/<int:activity_id>/delete', methods=['POST'])
@jwt_required()
def delete_activity(activity_id):
    try:
        activity = Activity.query.get(activity_id)
        if current_user.id is not activity.created_by:
            abort(403)
        db.session.delete(activity)
        return {'activity': activity.id}, 200
    except Exception as err:
        raise


@bp.route('/list/user', methods=['GET'])
@jwt_required()
def list_user_activities():
    try:
        activities = Activity.query.filter(
            Activity.created_by == current_user.id
        )
        return {'activities': [
            ac.to_dict() for ac in activities
        ]}
    except Exception as err:
        raise