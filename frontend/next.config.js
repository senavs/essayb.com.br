const nextConfigs = {
  env: {
  },
  serverRuntimeConfig: {
    // serve side
    BACKEND_DOMAIN: process.env.BACKEND_DOMAIN,
    FRONTEND_DOMAIN: process.env.FRONTEND_DOMAIN,
    USE_HTTPS: process.env.USE_HTTPS,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
  },
  publicRuntimeConfig: {
    // server and client side
    BACKEND_DOMAIN: process.env.BACKEND_DOMAIN,
    FRONTEND_DOMAIN: process.env.FRONTEND_DOMAIN,
    USE_HTTPS: process.env.USE_HTTPS,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
  }
}

module.exports = nextConfigs