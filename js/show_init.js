define(['jquery', 'lib/store'], function ($, store) {
    function formatNumber (n) {
        n = n.toString()
        return n[1] ? n : '0' + n;
    }

    function formatTime (number, format) {
        let time = new Date(number)
        let newArr = []
        let formatArr = ['Y', 'M', 'D', 'h', 'm', 's']
        newArr.push(time.getFullYear())
        newArr.push(formatNumber(time.getMonth() + 1))
        newArr.push(formatNumber(time.getDate()))
    
        newArr.push(formatNumber(time.getHours()))
        newArr.push(formatNumber(time.getMinutes()))
        newArr.push(formatNumber(time.getSeconds()))
    
        for (let i in newArr) {
            format = format.replace(formatArr[i], newArr[i])
        }
        return format;
    }
    return {
        init: function () {
            $(function () {
                var current = 0;
                var size = 20;
                /*瀑布流开始*/
                var container = $('.waterfull ul');
                var loading = $('#imloading');
                // 初始化loading状态
                loading.data("on", true);
                /*判断瀑布流最大布局宽度，最大为1280*/
                function tores() {
                    var tmpWid = $(window).width();
                    if (tmpWid > 1280) {
                        tmpWid = 1280;
                    } else {
                        var column = Math.floor(tmpWid / 320);
                        tmpWid = column * 320;
                    }
                    $('.waterfull').width(tmpWid);
                }
                tores();
                $(window).resize(function () {
                    tores();
                });
                container.imagesLoaded(function () {
                    container.masonry({
                        columnWidth: 320,
                        itemSelector: '.item',
                        isFitWidth: true,//是否根据浏览器窗口大小自动适应默认false
                        isAnimated: true,//是否采用jquery动画进行重拍版
                        isRTL: false,//设置布局的排列方式，即：定位砖块时，是从左向右排列还是从右向左排列。默认值为false，即从左向右
                        isResizable: true,//是否自动布局默认true
                        animationOptions: {
                            duration: 800,
                            //easing: 'easeInOutBack',//如果你引用了jQeasing这里就可以添加对应的动态动画效果，如果没引用删除这行，默认是匀速变化
                            queue: false//是否队列，从一点填充瀑布流
                        }
                    });
                });
           
                $(window).scroll(function () {
                    if (!loading.data("on")) return;
                    var itemNum = $('#waterfull').find('.item').length;
                    var itemArr = [];
                    if(itemNum<1) return;
                    itemArr[0] = $('#waterfull').find('.item').eq(itemNum - 1).offset().top + $('#waterfull').find('.item').eq(itemNum - 1)[0].offsetHeight;
                    itemArr[1] = $('#waterfull').find('.item').eq(itemNum - 2).offset().top + $('#waterfull').find('.item').eq(itemNum - 1)[0].offsetHeight;
                    itemArr[2] = $('#waterfull').find('.item').eq(itemNum - 3).offset().top + $('#waterfull').find('.item').eq(itemNum - 1)[0].offsetHeight;
                    var maxTop = Math.max.apply(null, itemArr);
                    if (maxTop < $(window).height() + $(document).scrollTop()) {
                        loading.data("on", false).fadeIn(800);
                        picLoad();
                    }
                });
                function loadImage(url) {
                    var img = new Image();
                    img.src = url;
                    if (img.complete) {
                        return img.src;
                    }
                    img.onload = function () {
                        return img.src;
                    };
                };

                function picLoad()
                {
                    var jsn = store.get(current, size);
                    (function (sqlJson) {
                        if (jsn.length < 1) {
                            loading.text('就只有这么多了！');
                        } else {
                            var html = "";
                            for (var i in sqlJson) {
                                html += "<li class='item'><a href='####' class='a-img'><img src='" + sqlJson[i].url + "'></a>";
                                html += "<h2 class='li-title'>" + sqlJson[i].title + "</h2>";
                                html += "<div class='qianm clearfloat'>";
                                html += "<span class='sp1'><b>1</b>浏览</span>";
                                html += "<span class='sp3'>" + formatTime(sqlJson[i].time_s,'Y-M-D h:m:s') + "&nbsp;上传</span></div></li>";
                            }
                            /*模拟ajax请求数据时延时800毫秒*/
                            var time = setTimeout(function () {
                                $(html).find('img').each(function (index) {
                                    loadImage($(this).attr('src'));
                                })
                                var $newElems = $(html).css({ opacity: 0 }).appendTo(container);
                                $newElems.imagesLoaded(function () {
                                    $newElems.animate({ opacity: 1 }, 800);
                                    container.masonry('appended', $newElems, true);
                                    loading.data("on", true).fadeOut();
                                    clearTimeout(time);
                                });
                            }, 800)
                        }
                    })(jsn);
                    current++;
                }
             
                /*item hover效果*/
                var rbgB = ['#71D3F5', '#F0C179', '#F28386', '#8BD38B'];
                $('#waterfull').on('mouseover', '.item', function () {
                    var random = Math.floor(Math.random() * 4);
                    $(this).stop(true).animate({ 'backgroundColor': rbgB[random] }, 1000);
                });
                $('#waterfull').on('mouseout', '.item', function () {
                    $(this).stop(true).animate({ 'backgroundColor': '#fff' }, 1000);
                });

                picLoad();
            })

            $("#clearcache").click(function(){
                if(window.confirm('确定要清空本地存储的图片吗?')){
                    store.clear();
                    window.location.reload() 
                }
            })
        }
    };
});