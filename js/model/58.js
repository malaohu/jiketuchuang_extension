define([], function () {
    return {
        url: "https://upload.58cdn.com.cn/json",
        method: "post",
        headers: {
            'Authorization': "",
            'Cache-Control': "no-cache"
        },
        paramName: 'blob',
        otherParams: {},
        maxFilesize: 51200,
        acceptedFiles: ".jpg,.jpeg,.png,.bmp",
        callback: function (result) {
            if (result && result.indexOf("n_v2")>-1) {
                let index = parseInt(Math.random() * 9) + 1;
                return "https://pic"+index+".58cdn.com.cn/nowater/webim/big/" + result
            }
            return '';
        },
        sendPost:function(file, fileName, $, progress, success){
            var reader = new FileReader();
            var parseUrl = this.callback;
            reader.onload = function(event) {
                var base64String = event.target.result;
                var jsn = {"Pic-Size":"0*0","Pic-Encoding":"base64","Pic-Path":"/nowater/webim/big/","Pic-Data":base64String.split(',')[1]}
                var settings = {
                    "url": "https://upload.58cdn.com.cn/json",
                    "method": "POST",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    xhr: function() {
                        var xhr = $.ajaxSettings.xhr();
                        if(progress)
                            xhr.upload.addEventListener('progress', function(evt){  
                                var per = evt.loaded / evt.total * 100;
                                progress(file, per);
                            }, false);
                        return xhr;
                    },
                    "data": JSON.stringify(jsn)
                }
                $.ajax(settings).done(function (response) {
                    if(progress)
                        progress(file, 101);
                    success(fileName, response, parseUrl);
                });
            };
            reader.readAsDataURL(file);
        }
    }
});