"""default_modalities

Revision ID: d500a4c01035
Revises: 89d7a32b0849
Create Date: 2022-04-13 22:15:25.728883

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd500a4c01035'
down_revision = '89d7a32b0849'
branch_labels = ()
depends_on = None


def upgrade():
    op.execute("""
    INSERT INTO modality (description) VALUES ('Pintura');
    INSERT INTO modality (description) VALUES ('Música');
    INSERT INTO modality (description) VALUES ('Dança');
    INSERT INTO modality (description) VALUES ('Escultura');
    INSERT INTO modality (description) VALUES ('Teatro');
    INSERT INTO modality (description) VALUES ('Literatura');
    INSERT INTO modality (description) VALUES ('Cinema');
    INSERT INTO modality (description) VALUES ('Fotografia');
    INSERT INTO modality (description) VALUES ('Outro');
    """)


def downgrade():
    op.execute("""
    TRUNCATE TABLE modality;
    """)