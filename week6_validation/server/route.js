const url = require('url');
function route(req,res,handlers) {
    console.log('router endter route');
    queryurl = url.parse(req.url);
    let pathname = queryurl.pathname;
    switch (pathname) {
        case '/getCityData':
            pathname = pathname;
            console.log('500')
            break;
        case '/uploadImg':
            pathname = pathname;
            break
        default :
            console.log('404');
            pathname = '/findFile';
            break;
    }
    console.log(queryurl.pathname);
    console.log(handlers[pathname]);
    console.log(handlers['/uploadImg']);
    if(typeof handlers[pathname] === 'function') {
        handlers[pathname](req,res,queryurl);
    } else {
        console.log('routehandlers not found')
        res.writeHead(404,{'Content-type' : 'text/plain'});
        res.write('404 Not Found');
        res.end();
    }
}


module.exports = {
    route : route
}