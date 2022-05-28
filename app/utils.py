from flask import request, jsonify, abort, make_response
from marshmallow.exceptions import ValidationError


def deserialize(schema):
    def _inner(func):
        def _decorator(*args, **kwargs):
            try:
                data = schema.load(request.json)
                return func(data=data, *args, **kwargs)
            except ValidationError as err:
                return jsonify(err.messages), 400
        return _decorator
    return _inner


def validate(schema):
    try:
        return schema.load(request.json)
    except ValidationError as err:
        print(request.json)
        print(err.messages)
        abort(make_response(jsonify(err.messages), 400))
