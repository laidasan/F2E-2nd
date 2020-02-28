const http = require('http');

function onRequest(req,res,router,handlers) {
    return function() {
        console.log('request received');
        router.route(req,res,handlers);
    }();
}

function startServer(router,handlers) {
    console.log('start server');
    http.createServer((req,res) => {onRequest(req,res,router,handlers)}).listen(8888);
}

module.exports = {
    startServer : startServer
}

