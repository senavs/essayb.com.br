from .user import search_by_username
from ...database import Follow
from ...database.client import DatabaseClient


def check_follow_by_username(username_follower: str, username_following: str, *, connection: DatabaseClient = None) -> bool:
    with DatabaseClient(connection=connection) as connection:
        follower = search_by_username(username_follower, connection=connection, raise_404=True, use_dict=False)
        following = search_by_username(username_following, connection=connection, raise_404=True, use_dict=False)

        query = connection.query(Follow).filter_by(ID_USER_FOLLOWER=follower.ID_USER, ID_USER_FOLLOWING=following.ID_USER).first()
        return bool(query)
