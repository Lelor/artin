from unittest import mock

from sqlalchemy.exc import IntegrityError

from . import BaseTestCase


class TestUser(BaseTestCase):
    @mock.patch('app.user.views.User')
    @mock.patch('app.user.views.db')
    def test_should_create_new_user_and_return_201(self, m_db, m_user):
        body = {
            'name': 'abobrinha',
            'biography': 'bananinha',
            'email': 'xpto@xpto.com',
            'username': 'banana',
            'password': 'banana'
        }
        m_user.return_value = mock.Mock(id=1)
        res = self.client.post('/user/new', json=body)
        self.assertEqual(res.status_code, 200)
        m_user.assert_called_once_with(**body)


    @mock.patch('app.user.views.db')
    def test_should_not_create_new_user_and_return_409_on_conflict(self, m_db):
        body = {
            'name': 'abobrinha',
            'biography': 'bananinha',
            'email': 'xpto@xpto.com',
            'username': 'banana',
            'password': 'banana'
        }
        m_db.session.commit.side_effect = IntegrityError(None, None, None)
        res = self.client.post('/user/new', json=body)
        self.assertEqual(res.status_code, 409)
        self.assertEqual(res.json, {'error': 'User already registered'})
        