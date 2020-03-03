; (function () {
    const form = document.querySelector('.form');


    const selectsOptional = document.querySelectorAll('.form__select--optional');
    const selectCity = document.querySelector('#AddressCity');
    const selectTown = document.querySelector('#AddressDist');
    const selectBirthYear = document.querySelector('.form__select--BirthYear');
    // console.log(selectBirthYear);
    // const selectBirthMonth = document.querySelector('.form__select--BirthMonth');
    const selectExpireYear = document.querySelector('.form__select--ExpireDateYear');
    const selectMonth = document.querySelector('.form__select--month');
    const selectBirthDay = document.querySelector('.form__select--BirthDay');
    const monthstrs = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];


    const hasTooltip = document.querySelectorAll('[data-toggle="tooltip"]');
    
    let xhr = new XMLHttpRequest;
    
    // form.addEventListener('submit',(e) => {
    //     e.preventDefault();
    // })


    //可選填的select，把尚未選擇的字體設定灰色
    if(selectsOptional) {
        selectsOptional.forEach((select) => {
            select.style.setProperty('color', '#555');
            select.addEventListener('change', (e) => {
                console.log('select change');
                select.style.setProperty('color','#000')
            })
        })
    }

    //填充general address select option
    if(selectCity) {
        //general address select填充option
        xhr.open('Get','../data/data.json',true);
        xhr.onload = function() {
            //獲取縣市資料(json)
            if(xhr.status >= 200 && xhr.status <=300) {
                jsonData = JSON.parse(xhr.responseText);
                const cityData = jsonData['city'];
                const townData = jsonData['region'];
                //把縣市資料塞入 addresscity select
                for(let i = 0;i < cityData.length;i++) {
                    let option = document.createElement('option');
                    option.setAttribute('value',cityData[i]);
                    option.textContent = cityData[i];
                    selectCity.append(option);
                }

                //當縣市選擇不同時，鄉鎮資料跟著異動
                selectCity.addEventListener('change',(e) => {
                    console.log('value chane');
                    //先把原本鄉鎮的option remove掉
                    let options = selectTown.querySelectorAll('option');
                    options.forEach((option) => {
                        selectTown.removeChild(option)
                    })

                    // sesetCity.options.selecedIndex 取得使用者選擇的縣市(options.selectedIndex會從1開頭)
                    // 然後依照使用者選擇的縣市塞入鄉鎮資料
                    let selected = selectCity.options.selectedIndex - 1;
                    townData[selected].forEach((town) => {
                        let option = document.createElement('option');
                        option.setAttribute('value',town);
                        option.textContent = town;
                        selectTown.append(option);
                    })
                })
            }
        }
        xhr.send(null);
    }

    //填充 general brith data select
    if(selectBirthYear || selectMonth || selectBirthDay) {
        if(selectBirthYear) {
            let from = selectBirthYear.dataset['from'];
            let to = selectBirthYear.dataset['to'];
            console.log(from);
            console.log(to);
            while(from <= to) {
                console.log('add option');
                let option = document.createElement('option');
                option.setAttribute('value',from);
                option.textContent = from;
                selectBirthYear.append(option);
                from++;
            }
        }
        
        monthstrs.forEach((month) => {
            let option = document.createElement('option');
            option.setAttribute('value',month);
            option.textContent = month;
            selectMonth.append(option);
        })

        if(selectBirthDay) {
            for(let i = 1;i <= 31;i++) {
                let option = document.createElement('option');
                option.setAttribute('value',i);
                option.textContent = i;
                selectBirthDay.append(option);
            }
        }

    }

    if(selectExpireYear) {
        let from = selectExpireYear.dataset['from'];
        let to = selectExpireYear.dataset['to'];
        while(from <= to) {
            let option = document.createElement('option');
            option.setAttribute('value',from);
            option.textContent = from;
            selectExpireYear.append(option);
            from++;
        }

    }

    function setSelectOption(selects) {

    }


    //tooltip textcontent
    hasTooltip.forEach((ele) => {
        ele.nextElementSibling.textContent = ele.title;
    })
})();