
$(function(){
    /*瀑布流开始*/
    var container = $('.waterfull ul');
    var loading=$('#imloading');
    // 初始化loading状态
    loading.data("on",true);
    /*判断瀑布流最大布局宽度，最大为1280*/
    function tores(){
        var tmpWid=$(window).width();
        if(tmpWid>1280){
            tmpWid=1280;
        }else{
            var column=Math.floor(tmpWid/320);
            tmpWid=column*320;
        }
        $('.waterfull').width(tmpWid);
    }
    tores();
    $(window).resize(function(){
        tores();
    });
    container.imagesLoaded(function(){
      container.masonry({
        columnWidth: 320,
        itemSelector : '.item',
        isFitWidth: true,//是否根据浏览器窗口大小自动适应默认false
        isAnimated: true,//是否采用jquery动画进行重拍版
        isRTL:false,//设置布局的排列方式，即：定位砖块时，是从左向右排列还是从右向左排列。默认值为false，即从左向右
        isResizable: true,//是否自动布局默认true
        animationOptions: {
            duration: 800,
            easing: 'easeInOutBack',//如果你引用了jQeasing这里就可以添加对应的动态动画效果，如果没引用删除这行，默认是匀速变化
            queue: false//是否队列，从一点填充瀑布流
        }
      });
    });
    /*模拟从后台获取到的数据*/
    var sqlJson=[{'title':'瀑布流其实就是几个函数的事！','intro':'爆料，苏亚雷斯又咬人啦，C罗哪有内马尔帅，梅西今年要不夺冠，你就去泰国吧，老子买了阿根廷赢得彩票，输了就去不成了。','src':'images/one.jpeg','writer':'志强不息','date':'2小时前','looked':321},{'title':'瀑布流其实就是几个函数的事！','intro':'爆料了，苏亚雷斯又咬人啦，C罗哪有内马尔帅，梅西今年要不夺冠，你就去泰国吧，老子买了阿根廷赢得彩票，输了就去不成了。','src':'images/demo2.jpg','writer':'志强不息','date':'2小时前','looked':321},{'title':'瀑布流其实就是几个函数的事！','intro':'爆料了，苏亚雷斯又咬人啦，C罗哪有内马尔帅，梅西今年要不夺冠，你就去泰国吧，老子买了阿根廷赢得彩票，输了就去不成了。','src':'images/p1.jpg','writer':'志强不息','date':'2小时前','looked':321},{'title':'瀑布流其实就是几个函数的事！','intro':'爆料了，苏亚雷斯又咬人啦，C罗哪有内马尔帅，梅西今年要不夺冠，你就去泰国吧，老子买了阿根廷赢得彩票，输了就去不成了。','src':'images/p1.jpg','writer':'志强不息','date':'2小时前','looked':321}];
    /*本应该通过ajax从后台请求过来类似sqljson的数据然后，便利，进行填充，这里我们用sqlJson来模拟一下数据*/
    $(window).scroll(function(){
        if(!loading.data("on")) return;
        // 计算所有瀑布流块中距离顶部最大，进而在滚动条滚动时，来进行ajax请求，方法很多这里只列举最简单一种，最易理解一种
        var itemNum=$('#waterfull').find('.item').length;
        var itemArr=[];
        itemArr[0]=$('#waterfull').find('.item').eq(itemNum-1).offset().top+$('#waterfull').find('.item').eq(itemNum-1)[0].offsetHeight;
        itemArr[1]=$('#waterfull').find('.item').eq(itemNum-2).offset().top+$('#waterfull').find('.item').eq(itemNum-1)[0].offsetHeight;
        itemArr[2]=$('#waterfull').find('.item').eq(itemNum-3).offset().top+$('#waterfull').find('.item').eq(itemNum-1)[0].offsetHeight;
        var maxTop=Math.max.apply(null,itemArr);
        if(maxTop<$(window).height()+$(document).scrollTop()){
            //加载更多数据
            loading.data("on",false).fadeIn(800);
            (function(sqlJson){
                /*这里会根据后台返回的数据来判断是否你进行分页或者数据加载完毕这里假设大于30就不在加载数据*/
                if(itemNum>30){
                    loading.text('就有这么多了！');
                }else{
                    var html="";
                    for(var i in sqlJson){
                        html+="<li class='item'><a href='####' class='a-img'><img src='"+sqlJson[i].src+"'></a>";
                        html+="<h2 class='li-title'>"+sqlJson[i].title+"</h2>";
                        html+="<p class='description'>"+sqlJson[i].intro+"</p><div class='qianm clearfloat'>";
                        html+="<span class='sp1'><b>"+sqlJson[i].looked+"</b>浏览</span>";
                        html+="<span class='sp2'>"+sqlJson[i].writer+"</span><span class='sp3'>"+sqlJson[i].date+"&nbsp;By</span></div></li>";		
                    }
                    /*模拟ajax请求数据时延时800毫秒*/
                    var time=setTimeout(function(){
                        $(html).find('img').each(function(index){
                            loadImage($(this).attr('src'));
                        })
                        var $newElems = $(html).css({ opacity: 0}).appendTo(container);
                        $newElems.imagesLoaded(function(){
                            $newElems.animate({ opacity: 1},800);
                            container.masonry( 'appended', $newElems,true);
                            loading.data("on",true).fadeOut();
                            clearTimeout(time);
                        });
                    },800)
                }
            })(sqlJson);
        }
    });
    function loadImage(url) {
         var img = new Image(); 
         //创建一个Image对象，实现图片的预下载
          img.src = url;
          if (img.complete) {
             return img.src;
          }
          img.onload = function () {
            return img.src;
          };
     };
     loadImage('images/one.jpeg',test());
    /*item hover效果*/
    var rbgB=['#71D3F5','#F0C179','#F28386','#8BD38B'];
    $('#waterfull').on('mouseover','.item',function(){
        var random=Math.floor(Math.random() * 4);
        $(this).stop(true).animate({'backgroundColor':rbgB[random]},1000);
    });
    $('#waterfull').on('mouseout','.item',function(){
        $(this).stop(true).animate({'backgroundColor':'#fff'},1000);
    });
})