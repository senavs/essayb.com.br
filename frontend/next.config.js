const nextConfigs = {
  env: {
  },
  serverRuntimeConfig: {
    // serve side
    BACKEND_DOMAIN: process.env.BACKEND_DOMAIN,
    FRONTEND_DOMAIN: process.env.FRONTEND_DOMAIN,
    USE_HTTPS: process.env.USE_HTTPS
  },
  publicRuntimeConfig: {
    // server and client side
    BACKEND_DOMAIN: process.env.BACKEND_DOMAIN,
    FRONTEND_DOMAIN: process.env.FRONTEND_DOMAIN,
    USE_HTTPS: process.env.USE_HTTPS
  }
}

// console.log(process.env.BACKEND_DOMAIN)

// if (!nextConfigs.publicRuntimeConfig.BACKEND_DOMAIN) {
//   throw Error('Enviroument variable BACKEND_DOMAIN is not set')
// }

// if (!nextConfigs.publicRuntimeConfig.FRONTEND_DOMAIN) {
//   throw Error('Enviroument variable FRONTEND_DOMAIN is not set')
// }

module.exports = nextConfigs