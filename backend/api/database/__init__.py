from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from .. import config

engine = create_engine(config.database.DATABASE_URI)
DeclarativeBase = declarative_base()
Session = sessionmaker(engine)

from .models import *  # noqa
