from flask import Blueprint, jsonify, abort
from flask_jwt_extended import jwt_required, current_user

from app.activity.serializer import ActivitySchema
from app.utils import deserialize, validate
from app.models import User, Activity, UserActivity, db


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
        db.session.commit()
        return {'activity': activity.id}, 200
    except Exception as err:
        raise


@bp.route('/list/user', methods=['GET'])
@jwt_required()
def list_user_activities():
    try:
        # activities = Activity.query.filter(
        #     Activity.created_by == current_user.id
        # )
        activities = Activity.query\
            .join(UserActivity, UserActivity.user_id == current_user.id, isouter=True)\
            .with_entities(
                Activity.id,
                Activity.type,
                Activity.description,
                Activity.address,
                Activity.max_capacity,
                Activity.start_date,
                Activity.image,
                UserActivity.id.label('is_favorite')
            )
        return jsonify({'activities': [
            {
                'id': ac.id,
                'type': ac.type,
                'description': ac.description,
                'address': ac.address,
                'max_capacity': ac.max_capacity,
                'start_date': ac.start_date,
                'image': ac.image,
                'is_favorite': bool(ac.is_favorite)
            } for ac in activities
        ]})
    except Exception as err:
        raise


@bp.route('/<int:activity_id>/book', methods=['POST'])
@jwt_required()
def book_activity(activity_id):
    try:
        ua = UserActivity(
            user_id=current_user.id,
            activity_id=activity_id
        )
        db.session.add(ua)
        db.session.flush()
        db.session.commit()
        return jsonify(activity_id=activity_id)
    except Exception as err:
        raise


@bp.route('/<int:activity_id>/unbook', methods=['POST'])
@jwt_required()
def unbook_activity(activity_id):
    try:
        ua = UserActivity.query.filter(
            UserActivity.user_id == current_user.id,
            UserActivity.activity_id == activity_id
        ).first()
        db.session.delete(ua)
        db.session.commit()
        return jsonify(activity_id=activity_id)
    except Exception as err:
        raise