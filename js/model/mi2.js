define([], function () {
    return {
        url: "https://qiye.mi.com/index/upload",
        method: "post",
        headers: {
            'Authorization': "",
            'Cache-Control': "no-cache",
            'X-Requested-With':''
        },
        paramName: 'uploadImg',
        otherParams: {},
        maxFilesize: 51200,
        acceptedFiles: '.jpg,.jpeg,.png',
        callback: function (result) {
            let hosts = ["img03", 'img06', 'img07', 'img08']
            let index = parseInt(Math.random() * hosts.length);
            try {
                result = JSON.parse(result);
            } catch (e) { return ''; }
            if (result.code == 0) {
                return  result.data.key.replace(/img\d+/, hosts[index]);
            }else{
                if (window.confirm("上传失败，请检查是否已经小米平台？点击【确定】前往登陆？"))
                {
                    location.href = "https://qiye.mi.com/"
                    return ""
                }
            }
           
        }
    }
});
