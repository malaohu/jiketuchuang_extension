define([], function () {
    return {
        url: "https://baijiahao.baidu.com/pcui/comment/uploadImage",
        method: "post",
        headers: {
            'Authorization': "",
            'Cache-Control': "no-cache",
            'Token': localStorage['baidu_token']
        },
        paramName: 'file',
        otherParams: {},
        maxFilesize: 51200,
        acceptedFiles: ".jpg,.jpeg,.png",
        callback: function (result) {
            if (result.errno == 0) {
                return result.data.img_url;
            }
            if (window.confirm("上传失败，请检查是否已登陆百度百家？点击【确定】前往登陆？"))
            {
                location.href = "https://baijiahao.baidu.com/?wangyi=1"
                return ""
            }
            return ''; 
        
        }
    }
});


