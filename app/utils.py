from flask import request, jsonify
from marshmallow.exceptions import ValidationError


def deserialize(schema):
    def _inner(func):
        def _decorator(*args, **kwargs):
            try:
                data = schema.load(request.json)
                return func(data, *args, **kwargs)
            except ValidationError as err:
                return jsonify(err.messages)
        return _decorator
    return _inner
            
