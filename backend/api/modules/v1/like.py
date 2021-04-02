from loguru import logger
from sqlalchemy import func

from . import user, post
from ...database import Post
from ...database.client import DatabaseClient
from ...database.models import Like
from ...error.http import bad_request, not_found


def check(username: str, id_post: int, *, connection: DatabaseClient = None) -> bool:
    """Check if user has liked the post"""

    logger.info(f'Checking if user @{username} has liked post with id number ${id_post}')
    with DatabaseClient(connection=connection) as connection:
        searched_user = user.search_by_username(username, connection=connection, raise_404=True, use_dict=False)
        searched_post = post.search(id_post, connection=connection, raise_404=True, use_dict=False)

        has_liked = bool(searched_post.likes.filter_by(ID_USER=searched_user.ID_USER).first())

    logger.info(f'Checked if user @{username} has liked post with id number ${id_post} successfully')
    return has_liked


def count_by_id_post(id_post: int, *, connection: DatabaseClient = None) -> int:
    """Count like by post ID"""

    logger.info(f'Counting post likes by post id number {id_post}')
    with DatabaseClient(connection=connection) as connection:
        searched_post = post.search(id_post, connection=connection, raise_404=True, use_dict=False)

        n_likes = searched_post.likes.count()

    logger.info(f'Counted post likes by post id number {id_post} successfully')
    return n_likes


def count_by_username(username: str, *, connection: DatabaseClient = None) -> int:
    """Count like by post ID"""

    logger.info(f'Counting post likes by user @{username}')
    with DatabaseClient(connection=connection) as connection:
        searched_user = user.search_by_username(username, connection=connection, raise_404=True, use_dict=False)

        n_likes = connection.query(Post, Like) \
            .join(Like) \
            .with_entities(func.count(Like.ID_LIKE)) \
            .filter(Post.ID_USER == searched_user.ID_USER) \
            .group_by(Post.ID_USER).first()
        n_likes = n_likes[0] if n_likes else 0

    logger.info(f'Counted post likes by user @{username} successfully')
    return n_likes


def create(id_user: int, id_post: int, *, connection: DatabaseClient = None) -> dict:
    """Make user like some post"""

    logger.info(f'Create like relation between user with id number {id_user} and post with id number {id_post}')
    with DatabaseClient(connection=connection) as connection:
        searched_user = user.search_by_id(id_user, connection=connection, raise_404=True, use_dict=False)
        searched_post = post.search(id_post, connection=connection, raise_404=True, use_dict=False)

        if connection.query(Like).filter_by(ID_USER=searched_user.ID_USER, ID_POST=searched_post.ID_POST).first():
            raise bad_request.LikeAlreadyExistsException()

        like = Like(ID_USER=searched_user.ID_USER, ID_POST=id_post)
        like.insert(connection)
        like = like.to_dict()

    logger.info(f'Created like relation between user with id number {id_user} and post with id number {id_post} successfully')
    return like


def delete(id_user: int, id_post: int, *, connection: DatabaseClient = None) -> bool:
    """Remove like relation"""

    logger.info(f'Deleting like relation between user with id number {id_user} and post with id number {id_post}')
    with DatabaseClient(connection=connection) as connection:
        searched_user = user.search_by_id(id_user, connection=connection, raise_404=True, use_dict=False)
        searched_post = post.search(id_post, connection=connection, raise_404=True, use_dict=False)

        if not (like := connection.query(Like).filter_by(ID_USER=searched_user.ID_USER, ID_POST=searched_post.ID_POST).first()):
            raise not_found.LikeNotFoundException()

        like.delete(connection)

    logger.info(f'Deleted like relation between user with id number {id_user} and post with id number {id_post} successfully')
    return True
