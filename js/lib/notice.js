define([], function () {
    return {
        showMsg: function (title, content) {
            console.log(content);
            var opt = {
                type: "basic",
                title: title,
                message: content,
                iconUrl: "img/48.png"
            }

            chrome.notifications.create('', opt, function (id,err) {
                setTimeout(function () {
                    chrome.notifications.clear(id, function () { });
                }, 2000);
            });
        },
    }
});