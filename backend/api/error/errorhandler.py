from fastapi.exceptions import RequestValidationError
from fastapi.requests import Request
from fastapi.responses import JSONResponse
from loguru import logger
from starlette.exceptions import HTTPException


async def handler_python_exceptions(request: Request, exception: Exception) -> JSONResponse:
    logger.critical(f'Internal error: {exception}')
    return JSONResponse(status_code=500, content={'message': 'Internal Server Error'})


async def handler_http_request(request: Request, exception: HTTPException) -> JSONResponse:
    logger.error(f'{exception.detail}')
    return JSONResponse(status_code=exception.status_code, content={'message': str(exception.detail)})


async def handler_request_validation(request: Request, exception: RequestValidationError) -> JSONResponse:
    logger.warning('Request validation error')
    return JSONResponse(status_code=422, content={'message': str(exception)})


exception_handlers = {
    Exception: handler_python_exceptions,
    HTTPException: handler_http_request,
    RequestValidationError: handler_request_validation
}
