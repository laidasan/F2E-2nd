const universal = require('../app/universal');
const querystring = require('querystring');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
function getCityData(req,res,queryurl) {
    console.log('route handler getCityData was called');
    
    fs.stat(path.join(__dirname,'../data/data.json'),(err,stats) => {
        if(!err && stats.isFile()) {
            console.log('have data')
            fs.readFile(path.join(__dirname,'../data/data.json'),(err,content) => {
                if(!err) {
                    res.writeHead(200,{'Content-type' : 'application/json'});
                    res.write(content);
                    res.end();
                }
            })
        }else {
            console.log('sorry,we can\'t find data!')
            res.writeHead(404,{'Content-type' : 'text/plain'});
            res.write('404 not Found');
            res.end();
        }
    })
}

function index(req,res,queryurl) {
    req.on('data',(postDataChunk) => {
        console.log('data received');
    })
    req.on('end',() => {
        console.log('request received end');

    })
}

function uploadImg(req,res,queryurl) {
    console.log('requesthandler uploadImg was called');
    const form = formidable({multiples:true});
    // form.parse(req,(err,field,files) => {
    //     if(!err) {
    //         console.log('parse sucess');
    //         files.Photos instanceof Array ? files.Photos.forEach(file => console.log(file.path)) : console.log(files.Photos.path);
    //         files.Photos.forEach((file,index) => {
    //             fs.renameSync(file.path,path.join(__dirname,`../tmp/test${index}.png`));
    //         })
    //         // fs.renameSync(files.Photos.path,path.join(__dirname,'../tmp/test.png'));
    //     }else {
    //         console.log('err')
    //     }
    // })
    // fs.readFile(path.join(__dirname,'../page/payment.html'),(err,content) => {
    //     if(!err) {
    //         res.writeHead(200,{'Content-type' : 'text/html'});
    //         res.write(content);
    //         res.end();
    //     }
    // })
    res.writeHead(200,{
        'Content-type' : 'text/plain',
        'Access-Control-Allow-Origin': '*'
});
    res.write('payment.html');
    res.end()
}
module.exports = {
    getCityData : getCityData,
    index : index,
    uploadImg :uploadImg
}