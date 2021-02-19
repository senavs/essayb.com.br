from datetime import datetime
from sys import stdout

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger

from . import config
from .database.loader import Bootloader
from .modules.errorhandler import exception_handlers
from .modules.middlewares import LoggingMiddleware, ProcessTimeMiddleware

__version__ = '0.1.0'

app = FastAPI(title='essayB',
              description='Advanced Software Lab (LAS) essay blog project.',
              version=__version__,
              exception_handlers=exception_handlers)

# logging
logger.configure(handlers=[{'sink': stdout, 'format': config.logging.LOGURU_FORMAT}])
if config.logging.LOGGING_FILE:
    logger.add(f'logs/{datetime.now().strftime("%Y-%m-%d")}.log', level=0, rotation='500 MB', format=config.logging.LOGURU_FORMAT)

# middlewares
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_credentials=True, allow_methods=['*'], allow_headers=['*'])
app.add_middleware(ProcessTimeMiddleware)
app.add_middleware(LoggingMiddleware)

# others
bootloader = Bootloader()
