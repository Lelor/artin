"""place columns

Revision ID: d7e69c74374c
Revises: 896c033c2a21
Create Date: 2022-06-01 00:36:48.678891

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'd7e69c74374c'
down_revision = '896c033c2a21'
branch_labels = ()
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('place', sa.Column('image', sa.Text(), nullable=True))
    op.add_column('place', sa.Column('modalities', postgresql.JSON(astext_type=sa.Text()), nullable=True))
    op.add_column('place', sa.Column('created_by', sa.Integer(), nullable=False))
    op.drop_constraint('place_activity_id_fkey', 'place', type_='foreignkey')
    op.create_foreign_key(None, 'place', 'user', ['created_by'], ['id'])
    op.drop_column('place', 'activity_id')
    op.drop_column('place', 'picture')
    op.drop_column('place', 'type')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('place', sa.Column('type', sa.VARCHAR(length=20), autoincrement=False, nullable=False))
    op.add_column('place', sa.Column('picture', sa.VARCHAR(length=50), autoincrement=False, nullable=True))
    op.add_column('place', sa.Column('activity_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'place', type_='foreignkey')
    op.create_foreign_key('place_activity_id_fkey', 'place', 'activity', ['activity_id'], ['id'])
    op.drop_column('place', 'created_by')
    op.drop_column('place', 'modalities')
    op.drop_column('place', 'image')
    # ### end Alembic commands ###
