from ...database.client import DatabaseClient



def check_follow (id_user_follower : int, id_user_following: int, connection: DatabaseClient = None) -> bool:
    with DatabaseClient(connection=connection) as connection:


