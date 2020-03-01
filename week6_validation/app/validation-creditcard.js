;(() => {
    const $creditCard = document.querySelector('#CardNumber');
    const $ivisa = $creditCard.parentElement.querySelector('.visa');
    const $imaster = $creditCard.parentElement.querySelector('.master');

    $creditCard.addEventListener('input',(e) => {
        let cardType = universal.checkCardNumber($creditCard.value);
        console.log(cardType);
        cardType && (cardType === 'visa') ? $ivisa.classList.remove('hidden') || $ivisa.style.setProperty('display','block') : $ivisa.classList.add('hidden') || $ivisa.style.removeProperty('display');
        cardType && (cardType === 'master') ? $imaster.classList.remove('hidden') || $imaster.style.setProperty('display','block') : $imaster.classList.add('hidden') || $imaster.style.removeProperty('display');
    })

})()
