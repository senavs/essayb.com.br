from collections import namedtuple

from loguru import logger

from ...database.client import DatabaseClient
from ...modules.v1 import user, post

Status = namedtuple('Status', 'is_premium n_post is_allow_create_post')


def status(id_user: int, *, connection: DatabaseClient = None) -> Status:
    """Get user premium status information"""

    logger.info(f'Getting premium information with user id number {id_user}')
    with DatabaseClient(connection=connection) as conn:
        searched_user = user.search_by_id(id_user, connection=conn, raise_404=True, use_dict=False)

        is_premium = searched_user.IS_PREMIUM
        n_post = post.count_by_id(id_user, connection=conn)
        is_allow_create_post = n_post < 3 or is_premium

    logger.info(f'Got premium information with user id number {id_user} successfully')
    return Status(is_premium, n_post, is_allow_create_post)
