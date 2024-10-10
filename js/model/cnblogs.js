define([], function () {
    return {
        url: "https://upload.cnblogs.com/imageuploader/processupload",
        method: "post",
        headers: {
            'Authorization': "",
            'Cache-Control': "no-cache"
        },
        paramName: 'file',
        otherParams: {},
        maxFilesize: 51200,
        acceptedFiles: ".jpg,.jpeg,.png,.webp,.tif,.gif",
        callback: function (result) {
            if (result.m == 'ok') {
                return  result.d.url.https;
            }
            return '';
        }
    }
});