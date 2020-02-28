const server = require('./server');
const router = require('./route');
const routerhandlers = require('./routehandler');

const handlers = {
    '/getCityData' : routerhandlers.getCityData
}
server.startServer(router,handlers);