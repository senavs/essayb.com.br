import stripe
from loguru import logger
from stripe.error import InvalidRequestError

from ... import config
from ...database import Payment
from ...database.client import DatabaseClient
from ...error.http import forbidden

stripe.api_key = config.payment.STRIPE_SECRET_KEY


def checkout(id_user: int, *, connection: DatabaseClient = None) -> str:
    """Create payment session"""

    logger.info('Creating payment session')
    url = f'http{"s" if config.domain.USE_HTTPS else ""}://{config.domain.FRONTEND_DOMAIN}'

    session = stripe.checkout.Session().create(
        payment_method_types=['card'],
        line_items=[{
            'price': config.payment.STRIPE_PRICE_ID,
            'quantity': 1
        }],
        mode='payment',
        success_url=f'{url}/payment/success' + '?session_id={CHECKOUT_SESSION_ID}',
        cancel_url=f'{url}/payment/error'
    )
    logger.info('Counted payment session successfully')

    logger.info('Saving session id into payment table')
    with DatabaseClient(connection=connection) as conn:
        if payment := conn.query(Payment).filter_by(ID_USER=id_user).first():
            payment.update(conn, ID_SESSION=session.id)
        else:
            payment = Payment(ID_USER=id_user, ID_SESSION=session.id)
            payment.insert(conn)

    logger.info('Saved session id into payment table successfully')
    return session.id


def accept(id_user: int, id_session: str, *, connection: DatabaseClient = None) -> bool:
    """Accept payment and turn user into premium"""

    logger.info(f'Accepting payment from user with id number {id_user}')
    try:
        session = stripe.checkout.Session.retrieve(id_session)
    except InvalidRequestError:
        raise forbidden.WrongPaymentSessionException()

    if session.to_dict().get('payment_status', 'unpaid').lower() != 'paid':
        logger.warning('Payment with status not \'paid\'')
        return False

    with DatabaseClient(connection=connection) as conn:
        payment = conn.query(Payment).filter_by(ID_USER=id_user).first()
        payment.update(conn, ID_SESSION=id_session, IS_COMPLETE=True, commit=False)

        user = payment.user
        user.update(conn, IS_PREMIUM=True)

    logger.info(f'Accepted payment from user with id number {id_user} successfully')
    return True
