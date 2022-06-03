from app.models import Place, ma


class PlaceSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Place

    name = ma.auto_field()
    description = ma.auto_field()
    address = ma.auto_field()
    image = ma.auto_field()
    modalities = ma.List(ma.String())