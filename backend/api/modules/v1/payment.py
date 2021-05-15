import stripe
from loguru import logger

from ...database import Payment
from ...database.client import DatabaseClient
from ... import config

stripe.api_key = config.payment.STRIPE_SECRET_KEY


def checkout(id_user: int, *, connection: DatabaseClient = None) -> str:
    """Create payment session"""

    logger.info(f'Creating payment session')
    session = stripe.checkout.Session().create(
        payment_method_types=['card'],
        line_items=[{
            'price': config.payment.STRIPE_PRICE_ID,
            'quantity': 1
        }],
        mode='payment',
        success_url=f'http://{config.domain.FRONTEND_DOMAIN}/payment/success',
        cancel_url=f'http://{config.domain.FRONTEND_DOMAIN}/payment/error'
    )
    logger.info(f'Counted payment session successfully')

    logger.info(f'Saving session id into payment table')
    with DatabaseClient(connection=connection) as conn:
        if payment := conn.query(Payment).filter_by(ID_USER=id_user).first():
            payment.update(conn, ID_SESSION=session.id)
        else:
            payment = Payment(ID_USER=id_user, ID_SESSION=session.id)
            payment.insert(conn)

    logger.info(f'Saved session id into payment table successfully')
    return session.id
