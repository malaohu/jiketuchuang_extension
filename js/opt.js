requirejs.config({
    baseUrl: 'js',
    paths: { 'jquery':'lib/jquery'}
});

require(['jquery','lib/cache'], function ($, cache) {
    const upload_server_key = "server";
    const contextmenus_upload = "contextmenus";
    const  localstore= "localstore";

    $("#submit").click(function(){
        cache.setStorage(upload_server_key,  $("input:radio[name='optionsRadios']:checked").val())
        cache.setStorage(contextmenus_upload,  $("#state").val());
        cache.setStorage(localstore,  $("#localstore").val());
        if(confirm("保存设置成功！点击确定返回上传页面！"))
            window.location.href = 'popup.html'
    });

    $(document).ready(function() {
        let server = cache.getStorage(upload_server_key);
        $('input:radio[name="optionsRadios"]').filter('[value="'+server+'"]').attr('checked', true);
        $("#state").val(cache.getStorage(contextmenus_upload)||1)
        $("#localstore").val(cache.getStorage(localstore)||1)
  });
});