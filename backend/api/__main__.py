import uvicorn

from .config import deploy

if __name__ == '__main__':
    uvicorn.run('api:app', host=deploy.DEPLOY_HOST, port=deploy.DEPLOY_PORT,
                debug=deploy.DEPLOY_DEBUG, reload=deploy.DEPLOY_RELOAD, access_log=deploy.DEPLOY_ACCESS_LOG)
