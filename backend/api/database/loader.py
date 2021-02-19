from .. import config
from . import DeclarativeBase, engine


class Bootloader:

    def __init__(self, *, reset: bool = False):
        if config.database.DATABASE_RESET or reset:
            self.reset()
        self.create()

    @classmethod
    def create(cls):
        DeclarativeBase.metadata.create_all(engine)

    @classmethod
    def reset(cls):
        DeclarativeBase.metadata.drop_all(engine)
