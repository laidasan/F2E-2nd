(() => {
    const $nav = document.querySelector('.nav')
    const $navOptions = document.querySelectorAll('.nav__option').forEach ? document.querySelectorAll('.nav__option') : Array.from(document.querySelectorAll('.nav__option'))
    const $navOptionsChoose = document.querySelector('.nav__option--choose')
    const $navOptionLine = document.querySelector('.nav__option__line')
    $navOptionLine.style.setProperty('transform',`translateX(${$navOptionsChoose.dataset['index']})`)
    $nav.addEventListener('mouseover',e => {
        //如果是 SPA(single page applicaion)單頁式頁面可能每次mouseover都要找現在的頁面再哪裡，或是切換時更新現在所再頁面
        //const $navOptionsChoose = document.querySelector('.nav__option--choose')
    
        const target = e.target
        let isOption = target.matches ? target.matches('.nav__option') : target.className.includes('nav__option')
        if(isOption) {
            let hoverIndex = target.dataset['index']
            console.log(hoverIndex,$navOptionLine)
            $navOptionLine.style.setProperty('transform',`translateX(${hoverIndex * 100}%)`)
        }
    })

    $navOptions.forEach(option => {
        option.addEventListener('mouseleave',e => {
        option.style.removeProperty('background')
        $navOptionLine.style.setProperty('transform',`translateX(${$navOptionsChoose.dataset['index']})`)
        })
    })
})()