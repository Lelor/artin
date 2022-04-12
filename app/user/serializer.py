from app.models import User, ma


class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User

    email = ma.Email()
    username = ma.auto_field()
    password = ma.auto_field()