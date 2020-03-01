(() => {
    const status = {};
    const $valid = document.querySelectorAll('[data-valid]');
    const $submit = document.querySelector('[type="submit"]');
    const form = document.querySelector('.form');
    // console.log($valid);
    // console.log($submit);
    // console.log(status);
    // console.log(checkSubmit(status));
    $valid.forEach((ele) => {
        ele.addEventListener('input',(e) => {
            let checkname = `check${ele.name}`;             //組合check +  element name屬性的值
            let result = universal[checkname](ele.value);   //把組合出來的checkname，用來呼叫對應的universal物件中的function(檢查格式正不正確)
            result ? ele.classList.remove('warn') : ele.classList.add('warn'); //符合格式就把remove class warn 反之 add class warn
            status[checkname] = result;                     //將結果存在status物件
            // let ary = [];                                   //取出所有的結果
            // for(let pro in status) {
            //     ary.push(status[pro]);
            // }

            // //如果取出的結果跟需要檢查的input數量一樣，而且都是true的話，移除submit按鈕的class warn 反之 add class warn
            // (ary.length === $valid.length && ary.every(val => val) ? $submit.classList.remove('warn') : $submit.classList.add('warn')); 
            checkSubmit(status) ? $submit.classList.remove('warn') : $submit.classList.add('warn');
        })
    })

    form.addEventListener('submit',(e) => {
        e.preventDefault();
        return checkSubmit(status) ?  form.submit() : false; 
    })

    function checkSubmit(status) {
        let ary = [];                    
        for(let pro in status) {
            ary.push(status[pro]);
        }
        return (ary.length === $valid.length && ary.every(val => val));
    }
})();