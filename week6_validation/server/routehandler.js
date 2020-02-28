const querystring = require('querystring');
const path = require('path');
const fs = require('fs');
function getCityData(res,req,queryurl) {
    console.log('route handler getCityData was called');
    
    fs.stat(path.join(__dirname,'../data/data.json'),(err,stats) => {
        if(!err && stats.isFile()) {
            console.log('have data')
            fs.readFile(path.join(__dirname,'../data/data.json'),(err,content) => {
                if(!err) {
                    req.writeHead(200,{'Content-type' : 'application/json'});
                    req.write(content);
                    req.end();
                }
            })
        }else {
            console.log('sorry,we can\'t find data!')
            req.writeHead(404,{'Content-type' : 'text/plain'});
            req.write('404 not Found');
            req.end();
        }
    })
    
}
module.exports = {
    getCityData : getCityData
}