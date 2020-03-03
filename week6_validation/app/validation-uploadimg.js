;(() => {
    const $images = document.querySelectorAll('.form__uploadImg');
    const $submit = document.querySelector('[type="submit"]');
    const $warnMessage = document.querySelector('.form__warnMessage');
    const $warnMessageSpan = $warnMessage.querySelector('span');
    const $form = document.querySelector('.form');
    let $inputFile = document.querySelector('input[type="file"]');
    let addFiles = [];
    console.log(this.universal)
    console.log($images);
    console.log($warnMessage)

    function checkSubmit(list) {
        return list.length === 3 ? $submit.classList.remove('warn') : $submit.classList.add("warn");
    }
    function showImage(list) {
        list.forEach((file,index) => $images[index].setAttribute('src',URL.createObjectURL(file)));
        checkSubmit(list);
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
})();
