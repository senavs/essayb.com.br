from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .modules.errorhandler import exception_handlers
from .modules.middlewares import ProcessTimeMiddleware

__version__ = '0.1.0'

app = FastAPI(title='essayB',
              description='Advanced Software Lab (LAS) essay blog project.',
              version=__version__,
              exception_handlers=exception_handlers)

# middlewares
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_credentials=True, allow_methods=['*'], allow_headers=['*'])
app.add_middleware(ProcessTimeMiddleware)
