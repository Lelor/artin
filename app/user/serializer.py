from app.models import User, ma


class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User

    given_name = ma.auto_field()
    family_name = ma.auto_field()
    email = ma.Email()
    username = ma.auto_field()
    password = ma.auto_field()