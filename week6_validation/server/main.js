const server = require('./server');
const router = require('./route');
const routerhandlers = require('./routehandler');

const handlers = {
    '/getCityData' : routerhandlers.getCityData,
    '/uploadImg' : routerhandlers.uploadImg
}
server.startServer(router,handlers);