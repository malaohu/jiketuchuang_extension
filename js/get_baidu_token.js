
if(localStorage['edit-token']){
    alert("已经获取到TOKEN,将TOKEN缓存扩展程序 >>>>  "+ localStorage['edit-token'])
    chrome.runtime.sendMessage({
        info: localStorage['edit-token'].replace("\"","")
    });
}

