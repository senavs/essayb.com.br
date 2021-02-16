from pydantic import BaseSettings


class DeploySettings(BaseSettings):
    DEPLOY_HOST: str = '0.0.0.0'
    DEPLOY_PORT: int = 8888
    DEPLOY_DEBUG: bool = False
    DEPLOY_RELOAD: bool = False
    DEPLOY_ACCESS_LOG: bool = False


class LoggingSetting(BaseSettings):
    LOGURU_FORMAT: str = '<green>{time:YYYY-MM-DD HH:mm:ss.SSS}</green> | <level>{level: <8}</level> | <bold>{message}</bold>'
    LOGGING_IGNORED_PATHS: str = '/metrics /health /docs /redoc /openapi.json /favicon.ico'
    LOGGING_FILE: bool = True


deploy = DeploySettings()
logging = LoggingSetting()
