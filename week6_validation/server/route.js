const url = require('url');
function route(res,req,handlers) {
    console.log('router endter route');
    queryurl = url.parse(res.url);
    // console.log(queryurl.pathname);
    let pathname = queryurl.pathname;
    console.log(pathname);
    console.log(handlers['/getCityData']);
    switch (pathname) {
        case '/getCityData':
            pathname = pathname;
            console.log('500')
            break;
        case '/index.html':
            pathname = pathname;
            break
        default :
            console.log('404');
            pathname = '/findFile';
            break;
    }
    if(typeof handlers[pathname] === 'function') {
        handlers[pathname](res,req,queryurl);
    } else {
        console.log('routehandlers not found')
        req.writeHead(404,{'Content-type' : 'text/plain'});
        req.write('404 Not Found');
        req.end();
    }
}


module.exports = {
    route : route
}