from typing import Optional

from sqlalchemy.orm.session import query

from . import DeclarativeBase, Session


class DatabaseClient:
    _session = _query = None

    def __init__(self, *, connection: 'DatabaseClient' = None):
        self._connection = connection

    @property
    def session(self) -> Session:
        return self._session

    @property
    def query(self) -> query:
        return self._query

    def add(self, *obj: DeclarativeBase, commit: Optional[bool] = True):
        self.session.add_all(obj)
        if commit:
            self.commit()

    def delete(self, *obj: DeclarativeBase, commit: Optional[bool] = True):
        for instance in obj:
            self.session.delete(instance)
        if commit:
            self.commit()

    def commit(self):
        self.session.commit()

    def flush(self):
        self.session.flush()

    def rollback(self):
        self.session.rollback()

    def connect(self):
        self._session = Session()
        self._query = self.session.query

    def close(self):
        if self._connection is None:
            self.session.close()

    def __enter__(self) -> 'DatabaseClient':
        if self._connection is not None:
            return self._connection

        self.connect()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type and issubclass(exc_type, Exception) and self._connection is None:
            self.rollback()
        self.close()
