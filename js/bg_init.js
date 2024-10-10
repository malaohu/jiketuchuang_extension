define(['jquery', 'lib/notice', 'lib/cache', 'lib/callback', 'config'], function ($, notice, cache, cb, conf) {
  return {
    init: function () {
      chrome.browserAction.onClicked.addListener(function (tab) {
        chrome.tabs.create({ 'url': chrome.extension.getURL('popup.html') });
      });


      chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        console.log(message);
        localStorage['baidu_token'] = message["info"]; 
      });
  
      chrome.webRequest.onBeforeSendHeaders.addListener(
        function(details) {

          // for (var i = 0; i < details.requestHeaders.length; ++i) {
            
          //   if (details.requestHeaders[i].name === 'Origin') {
          //     details.requestHeaders[i].value = "https://filebroker.aliexpress.com";
          //     console.log("已修改头信息");
          //     break;
          //   }
          // }
          details.requestHeaders.push({
            name: 'Origin', 
            value: 'https://filebroker.aliexpress.com'
          });
          //details.requestHeaders.append({"name": "Origin", "value": "https://filebroker.aliexpress.com"})
          return {requestHeaders: details.requestHeaders};
        },
        {urls: ["https://filebroker.aliexpress.com/x/upload?jiketuchuang=1"]},
        ["blocking", "requestHeaders", "extraHeaders"]
      );
   
      // chrome.webRequest.onBeforeSendHeaders.addListener(
      //   function (details) {
      //     for (var i = 0; i < details.requestHeaders.length; ++i) {
      //       if (details.requestHeaders[i].name === 'User-Agent') {
      //         details.requestHeaders[i].value = "iAliexpress/8.25.0 (iPhone; iOS 14.5; Scale/3.00)";
      //         console.log("已修改头信息");
      //       }
      //     }
      //     return { requestHeaders: details.requestHeaders };
      //   },
      //   { urls: ["https://kfupload.alibaba.com/mupload?jiketuchuang=1"] },
      //   ["blocking", "requestHeaders"]);


      // if (cache.getStorage("contextmenus") != '0') {
      //   chrome.contextMenus.create({ "title": "上传图片且复制URL", "contexts": ["image"], "onclick": function (info, tab) { getImageData(info.srcUrl); } });
      // }

      function getImageData(srcUrl) {
        notice.showMsg('提示:', '开始上传文件......');
        var xhr = new XMLHttpRequest();
        xhr.open('GET', srcUrl, true);
        xhr.responseType = 'blob';
        xhr.send(null);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              var fileName = xhr.responseURL.replace(/^.*[\\\/]/, '');
              var contentType = xhr.getResponseHeader('content-type');
              wchCreateResource(xhr.response, fileName, contentType);
            } else {
              alert('Error occurred retrieving image data.');
            }
          }
        };
      };

      function wchCreateResource(imageData, fileName, contentType) {

        let config = conf.getConfig(cache.getStorage("server"));

        if (config.sendPost) {
          config.sendPost(imageData, fileName, $, undefined, success);
        } else {
          var formData = new FormData();
          formData.append(config.paramName, imageData, fileName);
          for (var key in config.otherParams) {
            formData.append(key, config.otherParams[key])
          }
          $.ajax({
            type: config.method,
            url: config.url,
            data: formData,
            processData: false,
            contentType: false
          }).done(function (data) {
            success(fileName, data, config.callback)
          });

        }
      };

      function success(fileName, result, parseUrl) {
        var url = parseUrl(result);
        if (url && url.indexOf("http") > -1) {
          copyToClipboard(url);
          cb.success(fileName, url);
          notice.showMsg('提示:', '上传完成已复制到剪切板\r\n' + url);
        } else {
          notice.showMsg("提示:", "上传失败: " + url);
        }
      }


      function copyToClipboard(text) {
        const input = document.createElement('input');
        input.style.position = 'fixed';
        input.style.opacity = 0;
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand('Copy');
        document.body.removeChild(input);
      };
    }
  }
});