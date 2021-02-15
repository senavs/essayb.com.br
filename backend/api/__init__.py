from fastapi import FastAPI

__version__ = '0.1.0'

app = FastAPI(title='essayB',
              description='Advanced Software Lab (LAS) essay blog project.',
              version=__version__)
