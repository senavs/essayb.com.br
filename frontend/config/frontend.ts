import getConfig from "next/config"


const { publicRuntimeConfig } = getConfig()

const urls = {
  github: {
    Jmarcelo98: 'https://github.com/Jmarcelo98',
    Mat123Reis: 'https://github.com/Mat123Reis',
    senavs: 'https://github.com/senavs',
    ygoliveira: 'https://github.com/ygoliveira',
  },
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    signup: '/auth/signup'
  },
  user: {
    profile: '/profile/{username}'
  },
  common: {
    index: '/',
    subscribe: '/subscribe',
    search: '/search'
  },
  post: {
    search: '/post/{id_post}',
    edit: '/post/{id_post}/edit',
    filter: '/category/{category}'
  },
}

const payments = {
  publickKey: publicRuntimeConfig.STRIPE_PUBLIC_KEY
}

export { urls, payments }