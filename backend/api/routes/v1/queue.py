from fastapi import APIRouter

from ...queue_manager.task import publish_task
from .models.queue import PublishResponse

router = APIRouter(prefix='/queue', tags=['Queue Manager'])


@router.post('/publish', summary='Force publish_task', status_code=202, response_model=PublishResponse)
def _publish():
    publish_task.delay()
    return {}
