define(['lib/base64'], function (base64) {
    var _info = {
        'version': '0.1.0',
        'author': 'malaohu(laohu_ma#163.com)'
    };

    //调试模式
    var _is_debuger = !1;

    return {
        setStorage: function (name, obj) {
            localStorage.removeItem(name);
            localStorage.setItem(name, _is_debuger ? obj : base64.encode(obj))
        },

        getStorage: function (name) {
            return localStorage.getItem(name) == null ? null : _is_debuger ? localStorage.getItem(name) : base64.decode(localStorage.getItem(name));
        },
    
        delStorage: function (name) {
            localStorage.removeItem(name);
        }
    }
});