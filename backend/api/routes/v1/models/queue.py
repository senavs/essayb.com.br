from pydantic import BaseSettings


class PublishResponse(BaseSettings):
    message = 'publish_task was sent successfully to the queue'
