define(['jquery', 'lib/dropzone', 'lib/cache', 'lib/callback', 'config'], function ($, dropzone, cache, cb, conf) {
    return {
        initPopup: function () {

            var _file_urls = [];

            dropzone.autoDiscover = false;
            var dropz = createDZ();

            function createDZ() {
   
                let config = conf.getConfig(cache.getStorage("server"));
                console.log(config)
                return new dropzone(".dropzone", {
                    url: config.url,
                    method: config.method,
                    maxFilesize: config.maxFilesize,
                    acceptedFiles: config.acceptedFiles,
                    paramName: config.paramName,
                    params: config.otherParams,
                    autoProcessQueue: !config.sendPost,
                    addRemoveLinks: false,
                    headers: config.headers,
                    dictDefaultMessage: '<p><i class="fa fa-cloud-upload fa-3x" aria-hidden="true"></i></p><p><a href="#">点击选择图片</a><b>或者</b>拖拽图片到这里<b>或者</b>截图后粘贴(Ctrl+V)</p>',
                    dictCancelUpload: '取消',
                    dictRemoveFile: '删除',
                    dictFallbackMessage: '不好意思，您的浏览器不支持！',
                    dictInvalidFileType: '该文件不允许上传',
                    dictResponseError: '上传失败，请稍后重试',
                    init: function () {
                        this.on("success", function (file, result) {
                            success(file.name, result, config.callback, file);
                        });
                        this.on("addedfile",function(file,data){
                            if(config.sendPost){
                                config.sendPost(file, file.name, $, progress, success);
                            }
                        })
                    }
                });
            }
            function success(fileName, result, parseUrl, orgFile){
                try {
                    // console.log(fileName)
                    // console.log(result)
                    // console.log(parseUrl)
                    // console.log(orgFile)
                    url = parseUrl(result, fileName)
                    _file_urls.push({ "name": fileName, "url": url });
                    cb.success(fileName, url, orgFile);
                    build();
                } catch (e) {
                    console.error(e)
                    alert("文件上传出错，请重试一下！");
                }
            }

            function progress(file, per){
                if(per > 100)
                    $(file.previewElement).addClass("dz-success").addClass("dz-complete");
                $(".dz-upload", file.previewElement).attr("style","width:"+per+"%");
            }

            function build() {
                var _type = $("input[name='optionsRadios']:checked").val();
                if (_file_urls.length > 0) {
                    var _text = []
                    for (var i = 0; i < _file_urls.length; i++) {
                        var __url = _file_urls[i].url;
                        var __name = _file_urls[i].name;
                        if (_type == 1)
                            _text.push(__url)
                        else if (_type == 2)
                            _text.push('<img src="' + __url + '" alt="' + __name + '" title="' + __name + '" />')
                        else if (_type == 3)
                            _text.push('[img]' + __url + '[/img]')
                        else if (_type == 4)
                            _text.push('![' + __name + '](' + __url + ')')
                        else if (_type == 5)
                            _text.push('[![' + __name + '](' + __url + ')](' + __url + ')')
                    }
                    $("#int_urls").text(_text.join('\r\n'));
                }
            }

            function setDefaultSelect(){
                $("input[name='optionsRadios'][value='"+ (cache.getStorage("urlformat") || 2) +"']").attr("checked",1)
            }

            function cacheDefaultSelect(){
                cache.setStorage("urlformat",$("input[name='optionsRadios']:checked").val())
            }
           

            document.onpaste = function (event) {
                var items = (event.clipboardData || event.originalEvent.clipboardData).items;
                for (index in items) {
                    var item = items[index];
                    if (item.kind === 'file') {
                        dropz.addFile(item.getAsFile())
                    }
                }
            }

            $(document).ready(function () {
                setDefaultSelect();
                $("input[name='optionsRadios']").change(function (obj) {
                    build();
                    cacheDefaultSelect();
                });
            });
        }
    };
});