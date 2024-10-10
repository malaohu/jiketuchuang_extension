//本地存储
define(['lib/cache'], function (cache) {
    const key = 'localcache';
    function setStorage(title, url){
        let arr = JSON.parse(cache.getStorage(key) || '[]');
        arr.unshift({"title":title, "url":url, "time_s":Date.now()});
        cache.setStorage(key, JSON.stringify(arr));
    }

    function clear(){
        cache.setStorage(key,"");
    }
    return {
        set: setStorage,
        get:function(page, size){
            let arr = JSON.parse(cache.getStorage(key) || '[]');
            if(!size)
                return arr;
            else{
                let count = arr.length;
                let rArr = [];
                for(var i = page*size; i<((page+1) * size) && i < count; i++){
                    rArr.push(arr[i]);
                }
                return rArr;
            }
        },
        clear:clear
    }
});
