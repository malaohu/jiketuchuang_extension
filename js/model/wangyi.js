define([], function () {
    return {
        url: "https://community.codewave.163.com/gateway/lowcode/api/v1/app/upload",
        method: "post",
        headers: {
            'Authorization': "",
            'Cache-Control': "no-cache"
        },
        paramName: 'file',
        otherParams: {},
        maxFilesize: 51200,
        acceptedFiles: ".jpg,.jpeg,.png,.bmp,.svg,.gif,.webp",
        callback: function (result) {
            if (result.code == "200" && result.result) {
               
                return result.result;
            }
            return '';
        }
    }
});

