"""user new fields

Revision ID: 89871bf0f61e
Revises: 61c50c08439e
Create Date: 2022-06-02 22:22:17.659388

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '89871bf0f61e'
down_revision = '61c50c08439e'
branch_labels = ()
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('name', sa.String(length=80), nullable=True))
    op.add_column('user', sa.Column('biography', sa.Text(), nullable=True))
    op.execute('UPDATE "user" SET name = \'banana\'')
    op.alter_column('user', 'name', nullable=False)
    op.drop_constraint('user_place_id_fkey', 'user', type_='foreignkey')
    op.drop_constraint('user_modality_id_fkey', 'user', type_='foreignkey')
    op.drop_column('user', 'modality_id')
    op.drop_column('user', 'place_id')
    op.drop_column('user', 'given_name')
    op.drop_column('user', 'family_name')
    op.drop_column('user', 'type')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('type', sa.VARCHAR(length=10), autoincrement=False, nullable=True))
    op.add_column('user', sa.Column('family_name', sa.VARCHAR(length=80), autoincrement=False, nullable=False))
    op.add_column('user', sa.Column('given_name', sa.VARCHAR(length=30), autoincrement=False, nullable=False))
    op.add_column('user', sa.Column('place_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.add_column('user', sa.Column('modality_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.create_foreign_key('user_modality_id_fkey', 'user', 'modality', ['modality_id'], ['id'])
    op.create_foreign_key('user_place_id_fkey', 'user', 'place', ['place_id'], ['id'])
    op.drop_column('user', 'biography')
    op.drop_column('user', 'name')
    # ### end Alembic commands ###