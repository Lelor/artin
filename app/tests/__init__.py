from unittest import TestCase
from unittest.mock import patch, Mock

from app import create_app


class BaseTestCase(TestCase):
    @classmethod
    def setUpClass(cls):
        app = create_app()
        app.config["TESTING"] = True
        app.config["WTF_CSRF_METHODS"] = []

        cls.app = app
        cls.client = app.test_client()
        cls.app_context = app.test_request_context()
        cls.app_context.push()

    def setUp(self):
        flask_jwt_login_patcher = patch("flask_jwt_extended.utils.get_current_user")
        self.jwt_login = flask_jwt_login_patcher.start()
        self.jwt_current_user = self.jwt_login()
        self.addCleanup(flask_jwt_login_patcher.stop)
    
    def login_as_admin(
        self,
        id=1,
        email="email@artin.com.br",
        username="user.name"
    ):
        _mocked_user = Mock(
            id=id,
            email=email,
            username=username,
        )
        self.jwt_login.return_value = _mocked_user
        self.jwt_current_user = self.jwt_login()