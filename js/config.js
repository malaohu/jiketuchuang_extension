define(['model/58', 'model/jd', 'model/sina_weibo', 'model/baidu', 'model/suning', 'model/mi2','model/ali', 'model/wangyi', 'model/cnblogs'], 
    function (_58, jd, weibo, baidu, suning, mi2, ali, wangyi, cnblogs) {
    return {
        getConfig: function (server) {
            console.log(server)

            switch (server) {
                case 'wangyi':
                    return wangyi;
                case '58':
                    return _58;
                case 'jd':
                    return jd;  
                case 'weibo':
                    return weibo; 
                case 'baidubaijia':
                        return baidu;   
                case 'suning':
                        return suning;  
                case 'mi2':
                    return mi2;  
                case 'ali':
                    return ali;  
                case 'cnblogs':
                        return cnblogs;  
                default:
                    return _58;
            }
        }
    };
});