from time import perf_counter

from loguru import logger
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request

from .. import config


class ProcessTimeMiddleware(BaseHTTPMiddleware):

    async def dispatch(self, request: Request, call_next):
        start_time = perf_counter()

        response = await call_next(request)
        response.headers['X-Process-Time'] = f'{(perf_counter() - start_time):.2f}'

        return response


class LoggingMiddleware(BaseHTTPMiddleware):

    async def dispatch(self, request: Request, call_next):
        ip, method, path = request.client.host, request.method, request.url.path

        if path in config.logging.LOGGING_IGNORED_PATHS:
            return await call_next(request)

        logger.info(f'{"connection received":<20} | {ip:<16} | {method: <7} | {path}')
        response = await call_next(request)
        logger.info(f'{"connection finished":<20} | {ip:<16} | {method: <7} | {path}')

        return response
