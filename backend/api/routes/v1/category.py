from fastapi import APIRouter

from ...modules.v1.category import search, list_
from .models.category import SearchResponse

router = APIRouter(prefix='/categories', tags=['Category'])


@router.get('/{id_category}/search', summary='Search category by ID', status_code=200, response_model=SearchResponse)
def _search(id_category: int):
    return search(id_category)


@router.get('/list', summary='List all categories', status_code=200)
def _list():
    return list_()
