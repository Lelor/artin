from app.models import User, ma


class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User

    image = ma.auto_field()
    birth_date = ma.auto_field()
    name = ma.auto_field()
    address = ma.auto_field()
    biography = ma.auto_field()
    email = ma.Email()
    password = ma.auto_field()