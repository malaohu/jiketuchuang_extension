define([], function () {
    return {
        url: "https://filebroker.aliexpress.com/x/upload?jiketuchuang=1",
        method: "post",
        headers: {},
        paramName: 'file',
        otherParams: { "bizCode": "ae_profile_avatar_upload" },
        maxFilesize: 51200,
        acceptedFiles: ".jpg,.jpeg,.gif,.bmp,.png",
        callback: function (result) {
            console.log(result)
            if (!result) {
                if (window.confirm("上传失败，请检查是否已登录阿里巴巴账号？点击【确定】前往登陆？")) {
                    location.href = "https://best.aliexpress.com/"
                    return ""
                }
            } else {
                url = ""
                if (result["code"] > 0 && window.confirm("上传失败，请检查是否已登录阿里巴巴账号？点击【确定】前往登陆？")) {
                    location.href = "https://best.aliexpress.com/"
                    return ""
                }
                let hosts = ["ae01", "ae02", "ae03", "ae04", "ae05"]
                let index = parseInt(Math.random() * hosts.length);
                url = result["url"]
                url = url.replace("ae02", hosts[index])
               
                return url;
            }
        }
    }
});