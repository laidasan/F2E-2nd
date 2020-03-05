const universal = require('../app/universal');
const querystring = require('querystring');
const formidable = require('formidable');
const sizeOf = require('image-size');
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
    form.parse(req,(err,field,files) => {
        if(!err) {
            console.log('request parsed');
            if(files.Photos) {
                //將files 轉換成 Array，因為只有一個時files會是Object
                let photoFiles = files.Photos instanceof Array ? files.Photos : [files.Photos];
                //使用image-size package讀每個image 長寬
                let uploadFiles = photoFiles.map(file => {
                    let size = sizeOf(file.path);
                    return {width: size.width,height: size.height};
                })
                let result = false;
                //universial.checkImg檢查每個照片的大小是否有超過尺寸
                if(uploadFiles.length > 0 && universal.checkImg(uploadFiles)) {
                    photoFiles.forEach((file,index) => {
                        fs.renameSync(file.path,path.join(__dirname,`../tmp/upload${index}${file.name}`))
                    })
                    result = true;
                }
                //根據檢查結果發出不同的response
                result ? (() => {
                    console.log('pass');
                    res.writeHead(200,{
                        'Content-type' : 'text/plain',
                        'Access-Control-Allow-Origin': '*'
                    })
                    res.write('payment.html');
                    res.end();
                })() :(() => {
                    console.log('no pass')
                    res.writeHead(302,{
                        'Content-type': 'text/plain',
                        'Access-Control-Allow-Origin': '*'
                    })
                    res.write('profileupdate.html');
                    res.end();
                })()
            }else {
                res.writeHead(404,{
                    'Content-type' : 'text/plain',
                    'Access-Control-Allow-Origin': '*'
            });
                res.write('profileupdate.html');
                res.end();
            }
        }else {
            res.writeHead(404,{'Content-type': 'text/plain'});
            res.write('404 Not Found');
            res.end();
        }
    })
}

module.exports = {
    getCityData : getCityData,
    index : index,
    uploadImg :uploadImg
}