define([], function () {
    return {
        url: "#",
        method: "post",
        paramName: '',
        otherParams: {},
        maxFilesize: 51200,
        //acceptedFiles: '.jpg,.jpeg,.png,.bmp,.svg,.gif,.webp',
        acceptedFiles: '.jpg,.jpeg,.png,.gif,.webp',
        callback: function (result, fileName) {
            console.log(fileName)
            if (/<pid>([^<]{5,})<\/pid>/.test(result))
            {
                _hosts = ["https://i0.wp.com/", "https://i1.wp.com/","https://i2.wp.com/","https://i3.wp.com/","https://i4.wp.com/",]
                //_hosts = ["fc"]
                //return "https://image.baidu.com/search/down?url=https://"+_hosts[Math.floor((Math.random()*_hosts.length))]+".sinaimg.cn/large/" + RegExp.$1 + ".jpg"
                return _hosts[Math.floor((Math.random()*_hosts.length))]+"wx4.sinaimg.cn/large/" + RegExp.$1 + ".jpg"
            }
            if (window.confirm("上传失败，请检查是否已登陆微博？点击【确定】前往登陆？"))
            {
                location.href = "https://picupload.weibo.com"
                return ""
            }
            return ""
        },
        sendPost: function (file, fileName, $, progress, success) {
            console.log(file)
            var parseUrl = this.callback;
            var xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    if (progress)
                        progress(file, 101);
                    success(fileName, this.responseText, parseUrl, file)
                }
            });

            if (progress)
                xhr.upload.addEventListener('progress', function (evt) {
                    var per = evt.loaded / evt.total * 100;
                    progress(file, per);
                }, false);
            
            xhr.open("POST", "https://picupload.weibo.com/interface/pic_upload.php?s=xml&ori=1&data=1&rotate=0&wm=&app=miniblog&mime=image/png");
            xhr.send(file);
        }
    }
});