define([], function () {
    return {
        url: "https://club.jd.com/myJdcomments/ajaxUploadImage.action",
        method: "post",
        headers: {
            'Authorization': "",
            'Cache-Control': "no-cache"
        },
        paramName: 'Filedata',
        otherParams: [],
        maxFilesize: 51200,
        acceptedFiles: '.jpg,.jpeg,.png,.bmp,.svg,.gif,.webp',
        callback: function (result) {
            if (result && result.indexOf("NotLogin") < 1) {
                _hosts = ["img10", "img11", "img12", "img13", "img14"]
                _host = _hosts[Math.floor((Math.random() * _hosts.length))]

                return "https://" + _host + ".360buyimg.com/ddimg/" + result
            } else {
                if (window.confirm("上传失败，请检查是否已登录京东账号？点击【确定】前往登陆？")) {
                    location.href = "https://www.jd.com/"
                    return ""
                }
                return '';
            }
        }
    }
});