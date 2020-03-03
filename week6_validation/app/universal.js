((obj) => {
    typeof module === 'object' && module.exports ? module.exports = obj : this[obj.name] = obj;
})({
    name: 'universal',
    checkEmail: function(val) {return /.+@.+\..+/.test(val)},
    checkPassword: function(val) {return /.{8,16}/.test(this._password = val)},
    checkComfirmPassword: function(val) {return this._password === val},
    checkPhone: function(val) {return /[0-9]{4}\s[0-9]{3}\s[0-9]{3}/.test(val)},
    checkAddress: function(val) {return /[\u4e00-\u9fa5]/.test(val);},
    checkCardNumber: function(val) {
        return (/^4\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}/.test(val) && 'visa') ||
               (/^5\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}/.test(val) && 'master') ||
               ''
    },
    checkImg: function(ary) {return ary.length <= 3 && ary.every(file => file.width <= 150 && file.height <=150)}
})