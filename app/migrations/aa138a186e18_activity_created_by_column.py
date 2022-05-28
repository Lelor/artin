"""activity created_by column

Revision ID: aa138a186e18
Revises: d83e0c5ccf5c
Create Date: 2022-05-27 13:00:43.718624

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'aa138a186e18'
down_revision = 'd83e0c5ccf5c'
branch_labels = ()
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('activity', sa.Column('created_by', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'activity', 'user', ['created_by'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'activity', type_='foreignkey')
    op.drop_column('activity', 'created_by')
    # ### end Alembic commands ###
