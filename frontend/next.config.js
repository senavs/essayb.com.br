module.exports = {
  env: {
    BACKEND_DOMAIN: process.env.BACKEND_DOMAIN,
    FRONTEND_DOMAIN: process.env.FRONTEND_DOMAIN,
    USE_HTTPS: process.env.USE_HTTPS
  },
}

if (!process.env.BACKEND_DOMAIN) {
  throw Error('Enviroument variabl BACKEND_DOMAIN is not set')
}

if (!process.env.FRONTEND_DOMAIN) {
  throw Error('Enviroument variabl FRONTEND_DOMAIN is not set')
}