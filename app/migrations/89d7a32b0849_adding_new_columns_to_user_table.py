"""adding new columns to user table

Revision ID: 89d7a32b0849
Revises: b40d439b8a40
Create Date: 2022-04-12 00:45:37.952292

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '89d7a32b0849'
down_revision = 'b40d439b8a40'
branch_labels = ()
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('given_name', sa.String(length=30), nullable=False))
    op.add_column('user', sa.Column('family_name', sa.String(length=80), nullable=False))
    op.add_column('user', sa.Column('type', sa.String(length=10), nullable=False))
    op.add_column('user', sa.Column('birth_date', sa.Date(), nullable=False))
    op.add_column('user', sa.Column('address', sa.String(length=120), nullable=False))
    op.add_column('user', sa.Column('picture', sa.String(length=120), nullable=False))
    op.add_column('user', sa.Column('modality_id', sa.Integer(), nullable=True))
    op.add_column('user', sa.Column('place_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'user', 'place', ['place_id'], ['id'])
    op.create_foreign_key(None, 'user', 'modality', ['modality_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'user', type_='foreignkey')
    op.drop_constraint(None, 'user', type_='foreignkey')
    op.drop_column('user', 'place_id')
    op.drop_column('user', 'modality_id')
    op.drop_column('user', 'picture')
    op.drop_column('user', 'address')
    op.drop_column('user', 'birth_date')
    op.drop_column('user', 'type')
    op.drop_column('user', 'family_name')
    op.drop_column('user', 'given_name')
    # ### end Alembic commands ###
