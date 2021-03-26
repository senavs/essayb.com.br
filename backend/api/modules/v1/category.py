from typing import Union

from loguru import logger

from ...database import Category
from ...database.client import DatabaseClient
from ...error.http import not_found


def search(id_category: int, *, connection: DatabaseClient = None, raise_404: bool = True, use_dict: bool = True) -> Union[dict, Category]:
    """Search post category"""

    logger.info(f'Searching post category by id number {id_category}')
    with DatabaseClient(connection=connection) as connection:
        if not (category := Category.search(connection, id_category)) and raise_404:
            raise not_found.CategoryNotFoundException()

        if use_dict and category:
            category = category.to_dict()
        elif use_dict:
            category = {}

        logger.info(f'Category found by id number {id_category} successfully')
        return category


def list_(*, connection: DatabaseClient = None, use_dict: bool = True) -> list[dict, Category]:
    """List all post categories"""

    logger.info('Listing all post categories')
    with DatabaseClient(connection=connection) as connection:
        categories = connection.query(Category).all()

        if use_dict and categories:
            categories = [category.to_dict() for category in categories]
        elif use_dict:
            categories = []

    logger.info('List all post categories successfully')
    return categories
