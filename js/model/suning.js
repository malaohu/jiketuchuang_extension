define([], function () {
    return {
        url: "https://queqiao.suning.com/mbapsi-web/file/upload.do",
        method: "post",
        headers: {
            'Authorization': "",
            'Cache-Control': "no-cache"
        },
        paramName: 'file',
        otherParams: {},
        maxFilesize: 51200,
        acceptedFiles: '.jpg,.jpeg,.png,.bmp,.gif,.webp',
        callback: function (result) {
            if (result.retCode == "0" && result.data.fileUrl) {
                return result.data.fileUrl.replace("http:", "https:")
            } else if (window.confirm("上传失败，请检查是否已登陆苏宁易购？点击【确定】前往登陆？")) {
                location.href = "https://review.suning.com/imageload/uploadImg.do"
                return ""
            }
            return '';
        }
    }
});