from datetime import datetime

from celery import Celery
from celery.schedules import crontab
from loguru import logger

from ..config import worker
from ..database import Post
from ..database.client import DatabaseClient
from ..modules.v1 import post

app = Celery('tasks', broker=worker.BROKER_URI)

# celery beat
app.conf.beat_schedule = {
    'publish': {
        'task': 'api.queue_manager.task.publish_task',
        'schedule': crontab(minute='0', hour='0', day_of_month='*', month_of_year='*', day_of_week='*'),
    }
}


# celery task
@app.task(queue='essayb-dev', autoretry_for=(Exception,), retry_kwargs={'max_retries': 5})
def publish_task():
    """Publish all posts with PUBLISH_AT until now"""

    logger.info(f'Publishing users posts')
    with DatabaseClient() as conn:
        searched_posts = conn.query(Post).filter(Post.IS_PUBLISHED.is_(False), Post.PUBLISH_AT <= datetime.today())

        for p in searched_posts:
            logger.info(f'Publishing user post with id number {p.ID_POST}')
            post.publish(p.ID_USER, p.ID_POST, connection=conn)

    logger.info(f'Published users posts successfully')
