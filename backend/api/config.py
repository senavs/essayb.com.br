import os

from pydantic import BaseSettings


class AuthSetting(BaseSettings):
    SECRET_KEY: str = '16da5228ba6585e0082d1f3371cd8a20'


class DatabaseSettings(BaseSettings):
    DATABASE_URI: str
    DATABASE_RESET: bool = False


class DeploySettings(BaseSettings):
    DEPLOY_HOST: str = '0.0.0.0'
    DEPLOY_PORT: int = 8888
    DEPLOY_DEBUG: bool = False
    DEPLOY_RELOAD: bool = False
    DEPLOY_ACCESS_LOG: bool = False


class DomainSettings(BaseSettings):
    BACKEND_DOMAIN: str
    FRONTEND_DOMAIN: str
    USE_HTTPS: bool = False


class LoggingSetting(BaseSettings):
    LOGURU_FORMAT: str = '<green>{time:YYYY-MM-DD HH:mm:ss.SSS}</green> | <level>{level: <16}</level> | <bold>{message}</bold>'
    LOGGING_IGNORED_PATHS: str = '/metrics /health /docs /redoc /openapi.json /favicon.ico'
    LOGGING_IGNORED_METHODS: str = 'OPTIONS HEADER'
    LOGGING_FILE: bool = True


class PathSetting(BaseSettings):
    PROJECT_PATH: str = os.path.abspath(os.path.dirname(os.path.abspath(__file__)))

    def join(self, *args) -> str:
        return os.path.join(self.PROJECT_PATH, *args)


class PaymentSetting(BaseSettings):
    STRIPE_SECRET_KEY: str
    STRIPE_PRICE_ID: str


class WorkerSetting(BaseSettings):
    BROKER_URI: str


auth = AuthSetting()
database = DatabaseSettings()
deploy = DeploySettings()
domain = DomainSettings()
logging = LoggingSetting()
path = PathSetting()
payment = PaymentSetting()
worker = WorkerSetting()
