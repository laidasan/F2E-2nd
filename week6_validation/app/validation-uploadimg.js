;(() => {
    const $images = document.querySelectorAll('.form__uploadImg');
    const $submit = document.querySelector('[type="submit"]');
    const $warnMessage = document.querySelector('.form__warnMessage');
    const $form = document.querySelector('.form');
    let $inputFile = document.querySelector('input[type="file"]');
    let addFiles = [];
    // console.log(addFiles.length);
    console.log($images);

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
        $form.reset();
        $warnMessage.textContent = '';

        let selectFile = Array.from(e.currentTarget.files);
        if(addFiles.length + selectFile.length <=3) {
            let task = [];
            selectFile.forEach(file => {
                task.push(new Promise((resolve,reject) => {
                    let img = new Image();
                    img.onload = function () {resolve(this)};
                    img.onerror = function() {reject('err')};
                    img.src = URL.createObjectURL(file);

                }))
            })
            Promise.all(task).then(result => {
                console.log(result);
            },(err) => {
                console.log(err);
            })
        }else {
            console.log('超過三張');
            $warnMessage.textContent = '超過三張囉!'
        }
    })
})();
