;(() => {
    const $images = document.querySelectorAll('.form__uploadImg');
    const $submit = document.querySelector('[type="submit"]');
    const $warnMessage = document.querySelector('.form__warnMessage');
    const $warnMessageSpan = $warnMessage.querySelector('span');
    const $form = document.querySelector('.form');
    let $inputFile = document.querySelector('input[type="file"]');
    const $labels = document.querySelectorAll('.form__img-box')
    console.log($labels);
    const $delImgs = document.querySelectorAll('.form__delImg');

    const $label = document.querySelector('.form__img-box');
    // console.log($label);
    // $label.addEventListener('click',(e) => {
    //     console.log('label click');
    // })
    let addFiles = [];

    function checkSubmit(list) {
        return list.length === 3 ? $submit.classList.remove('warn') : $submit.classList.add("warn");
    }
    function showImage(list) {
        $images.forEach((image) => image.removeAttribute('src'));
        list.forEach((file,index) => {
            $images[index].setAttribute('src',URL.createObjectURL(file));
            $images[index].parentElement.removeAttribute('for');
            console.log($images[index].parentElement);
        });
        checkSubmit(list);
        // console.log($images[index].parentElement);
    }
    function deleteImg(e,index) {
        return function() {
            addFiles.splice(index,1);
            showImage(addFiles);

            //2020/3/4 label.setAttribute會點開上傳檔案畫面，但即使停止了事件傳遞與codepen測試(測試不會setAttribute不會造成觸發)
            //所以先暫用setTimeout來解決
            setTimeout(() => {
                $labels.forEach((label) => {
                    label.setAttribute('for','uploadFile');
                })
            },0)
            // console.log($labels);
            // $labels.forEach((label) => {
            //     label.setAttribute('for','uploadFile');
            // })
        }();
    }


    $inputFile.addEventListener('change',(e) => {
        console.log(e.currentTarget);
        console.log(e.currentTarget.files);
        $warnMessageSpan.textContent = '';
        $warnMessage.classList.remove('warn');

        let selectFile = Array.from(e.currentTarget.files);
        if(addFiles.length + selectFile.length <=3) {
            let task = [];
            selectFile.forEach(file => {
                task.push(new Promise((resolve,reject) => {
                    let img = new Image();
                    img.onload = function () {resolve({width:this.width,height:this.height})};
                    img.onerror = function() {reject('err')};
                    img.src = URL.createObjectURL(file);
                }))
            })
            Promise.all(task).then(result => {
                console.log(result);
                console.log('img upload finished');
                console.log(universal.checkImg(result));
                universal.checkImg(result) ? (() => {
                    console.log('check it pass!')
                    selectFile.forEach(file => addFiles.push(file));
                    showImage(addFiles);
                    $form.reset();
                })() : (() => {
                    console.log('check it warn!');
                    $warnMessage.classList.add('warn');
                    $warnMessageSpan.textContent = `image size wrong`;
                    $form.reset();
                })()
                
                // universal.checkImg(result) ? (() => {
                //     console.log('check it pass!')
                //     selectFile.forEach(file => addFiles.push(file));
                //     showImage(addFiles);
                // })() : $warnMessage.textContent = `<i class="fas fa-exclamation-triangle"></i>` || $warnMessage.classList.add('warn');
                // console.log($warnMessage);
            },(err) => {
                console.log(err);
                $warnMessage.textContent = 'Type Error';
                $warnMessage.classList.add('warn');
                $form.reset();
            })
        }else {
            console.log('超過三張');
            $warnMessage.classList.add('warn');
            $warnMessageSpan.textContent = 'more than three photos';
            $form.reset();
        }
    })


    $delImgs.forEach((delImg,index) => {
        delImg.addEventListener('click',(e) => {
            deleteImg(e,index);
        })
    })
    $form.addEventListener('submit',(e) => {
        e.preventDefault();
        let isSubmit = addFiles.length === 3 ? true : false;
        let formData = new FormData();
        addFiles.forEach(file => {
            formData.append('Photos',file);
        })
        let xhr = new XMLHttpRequest;
        xhr.open('POST','http://127.0.0.1:8888/uploadImg',true);
        xhr.onload = () => {
            if(xhr.status >=200 && xhr.status < 300) {
                window.location.href = `http://127.0.0.1:5500/page/${xhr.responseText}`;
            }else if(xhr.status >=300 && xrh.status < 400) {
                window.location.href = `http://127.0.0.1:5500/page/${xhr.responseText}`;

            }
        }
        isSubmit ? xhr.send(formData) : false;
        // isSubmit ? xhr.send(null) : '';
    })
})();
