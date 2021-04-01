from pydantic import BaseSettings


class Category(BaseSettings):
    id_category: int
    category: str


class SearchResponse(Category):
    pass
