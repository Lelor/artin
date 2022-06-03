from app.models import Activity, ma


class ActivitySchema(ma.SQLAlchemySchema):
    class Meta:
        model = Activity

    title = ma.auto_field()
    type = ma.auto_field()
    description = ma.auto_field()
    max_capacity = ma.auto_field()
    address = ma.auto_field()
    start_date = ma.auto_field()
    image = ma.auto_field()
    interval = ma.auto_field()
    cost = ma.auto_field()
    level = ma.auto_field()
    place = ma.Integer()