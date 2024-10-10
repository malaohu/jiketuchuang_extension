//文件上传成功后回调！由于前台和后台上传方式不一样！
define(['lib/store','lib/cache', 'lib/backup'], function (store, cache, backup) {
    function doit(title, url, orgFile){
        if(cache.getStorage("localstore")!=0)
            store.set(title, url)

        setTimeout(function() {
            console.log(orgFile)
            backup.ipfs(orgFile)
        }, 100);

    }


    return {
        success: doit
    }
});