from typing import Union

from loguru import logger
from sqlalchemy import desc

from ...database.client import DatabaseClient
from ...database.models import Comment
from ...error.http import forbidden, not_found
from . import post, user


def search(id_comment: int, *, connection: DatabaseClient = None, raise_404: bool = True, use_dict: bool = True) -> Union[dict, Comment, None]:
    """Search for post comment"""

    logger.info(f'Searching post comment by id number {id_comment}')
    with DatabaseClient(connection=connection) as connection:
        if not (comment := Comment.search(connection, id_comment)) and raise_404:
            raise not_found.PostCommentNotFoundException()

        if use_dict and comment:
            comment = comment.to_dict()
        elif use_dict:
            comment = {}

    logger.info(f'Searched post comment by id number {id_comment} successfully')
    return comment


def list_(id_post: int, *, connection: DatabaseClient = None, skip: int = 0, limit: int = None) -> list[dict]:
    """List all post comments"""

    logger.info(f'Listing posts comment with id number {id_post}')
    with DatabaseClient(connection=connection) as connection:
        searched_post = post.search(id_post, connection=connection, raise_404=True, use_dict=False)

        comments = searched_post.comments.order_by(desc(Comment.ID_COMMENT)).offset(skip).limit(limit)
        comments = [comment.to_dict() for comment in comments]

    logger.info(f'Listed posts comment with id number {id_post} successfully')
    return comments


def create(id_user: int, id_post: int, comment: str, *, connection: DatabaseClient = None) -> dict:
    """Add new comment to post"""

    logger.info(f'Creating new comment to post with id number {id_post} by user with id number {id_user}')
    with DatabaseClient(connection=connection) as connection:
        searched_user = user.search_by_id(id_user, connection=connection, raise_404=True, use_dict=False)
        searched_post = post.search(id_post, connection=connection, raise_404=True, use_dict=False)

        comment = Comment(ID_USER=searched_user.ID_USER, ID_POST=searched_post.ID_POST, COMMENT=comment)
        comment.insert(connection)
        comment = comment.to_dict()

    logger.info(f'Created new comment to post with id number {id_post} by user with id number {id_user} successfully')
    return comment


def delete(id_user: int, id_comment: int, *, connection: DatabaseClient = None) -> bool:
    """Remove like relation"""

    logger.info(f'Deleting post comment with id number {id_comment} by user with id number {id_user}')
    with DatabaseClient(connection=connection) as connection:
        searched_user = user.search_by_id(id_user, connection=connection, raise_404=True, use_dict=False)
        comment = search(id_comment, connection=connection, raise_404=True, use_dict=False)

        if searched_user.ID_USER == comment.post.ID_USER:
            logger.warning(f'Post owner @{searched_user.USERNAME} deleting post comment with id number {id_comment} from post {comment.post.ID_POST}')
        elif searched_user.ID_USER != comment.ID_USER:
            raise forbidden.UserDeletingOthersPostCommentException()

        comment.delete(connection)

    logger.info(f'Deleted post comment with id number {id_comment} by user with id number {id_user} successfully')
    return True
