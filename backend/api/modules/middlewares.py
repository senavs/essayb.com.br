from time import perf_counter

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request


class ProcessTimeMiddleware(BaseHTTPMiddleware):

    async def dispatch(self, request: Request, call_next):
        start_time = perf_counter()
        response = await call_next(request)
        response.headers['X-Process-Time'] = f'{(perf_counter() - start_time):.2f}'
        return response
