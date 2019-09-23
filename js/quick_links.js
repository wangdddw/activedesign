jQuery(function($) {
    //创建DOM
    var quickHTML = document.querySelector("div.quick_link_mian")
      , quickShell = $(document.createElement('div')).html(quickHTML).addClass('quick_links_wrap')
      , quickLinks = quickShell.find('.quick_links');
    quickPanel = quickLinks.next();
    quickShell.appendTo('.mui-mbar-tabs');

    //具体数据操作 
    var quickPopXHR, loadingTmpl = '<div class="loading" style="padding:30px 80px"><i></i><span>Loading...</span></div>', popTmpl = '<a href="javascript:;" class="ibar_closebtn" title="關閉"></a><div class="ibar_plugin_title"><h3><%=title%></h3></div><div class="pop_panel"><%=content%></div><div class="arrow"><i></i></div><div class="fix_bg"></div>', historyListTmpl = '<ul><%for(var i=0,len=items.length; i<5&&i<len; i++){%><li><a href="<%=items[i].productUrl%>" target="_blank" class="pic"><img alt="<%=items[i].productName%>" src="<%=items[i].productImage%>" width="60" height="60"/></a><a href="<%=items[i].productUrl%>" title="<%=items[i].productName%>" target="_blank" class="tit"><%=items[i].productName%></a><div class="price" title="单价"><em>¥<%=items[i].productPrice%></em></div></li><%}%></ul>', newMsgTmpl = '<ul><li><a href="#"><span class="tips">新回复<em class="num"><b><%=items.commentNewReply%></b></em></span>商品评价/晒单</a></li><li><a href="#"><span class="tips">新回复<em class="num"><b><%=items.consultNewReply%></b></em></span>商品咨询</a></li><li><a href="#"><span class="tips">新回复<em class="num"><b><%=items.messageNewReply%></b></em></span>我的留言</a></li><li><a href="#"><span class="tips">新通知<em class="num"><b><%=items.arrivalNewNotice%></b></em></span>到货通知</a></li><li><a href="#"><span class="tips">新通知<em class="num"><b><%=items.reduceNewNotice%></b></em></span>降价提醒</a></li></ul>', quickPop = quickShell.find('#quick_links_pop'), quickDataFns = {
        //购物信息
        message_list: {
            title: '购物车',
            content: '<div class="ibar_plugin_content"><div class="ibar_cart_group ibar_cart_product"><div class="ibar_cart_group_header"><span class="ibar_cart_group_title">模板堂</span><a href="#">我的购物车</a></div><ul><li class="cart_item"><div class="cart_item_pic"><a href="#"><img src="images/xiez.jpg" /></a></div><div class="cart_item_desc"><a href="#" class="cart_item_name">夏季透气真皮豆豆鞋反绒男士休闲鞋韩版磨砂驾车鞋英伦船鞋男鞋子</a><div class="cart_item_sku"><span>尺码：38码（精工限量版）</span></div><div class="cart_item_price"><span class="cart_price">￥700.00</span></div></div>	</li></ul></div><div class="cart_handler"><div class="cart_handler_header"><span class="cart_handler_left">共<span class="cart_price">1</span>件商品</span><span class="cart_handler_right">￥569.00</span></div><a href="#" class="cart_go_btn" target="_blank">去购物车结算</a></div></div>',
            init: $.noop
        },

        //我的资产
        history_list: {
            title: '會員登入',
            content: '<div class="ibar_plugin_content"><form target="_blank" class="ibar_recharge_form"><div class="ibar_recharge-field"><label>帳號</label><div class="ibar_recharge-fl"><div class="ibar_recharge-iwrapper"><input type="text" name="19" placeholder="手机号码" /></div><i class="ibar_recharge-contact"></i></div></div><div class="ibar_recharge-field"><label>密碼</label><div class="ibar_recharge-fl"><p class="ibar_recharge-mod"><span class="ibar_recharge-val"><div class="ibar_recharge-iwrapper"><input type="text" name="19" placeholder="手机号码" /></div></p><i class="ibar_recharge-arrow"></i><div class="ibar_recharge-vbox"><ul style="display:none;"><li><span>10</span>元</li><li class="sanwe selected"><span>100</span>元</li><li><span>20</span>元</li><li class="sanwe"><span>200</span>元</li><li><span>30</span>元</li><li class="sanwe"><span>300</span>元</li><li><span>50</span>元</li><li class="sanwe"><span>500</span>元</li></ul></div></div></div><div class="ibar_recharge-btn"><input type="submit" value="立即登入" /></div></form></div>',
            init: $.noop
        },
        //给客服留言
        leave_message: {
            title: '我关注的产品',
            content: $("#ibar_gzcp").html(),
            init: $.noop
        },
        mpbtn_histroy: {
            title: '歷史記錄',
            content: '<div class="ibar_plugin_content"><div class="ibar-history-head">共3件<a href="#">清空</a></div><div class="ibar-moudle-product"><div class="imp_item"><a href="#" class="pic"><img src="images/xiez.jpg" width="100" height="100" /></a><p class="tit"><a href="#">日本線行程</a></p><p class="price"><em>$</em>13,000 起</p><a href="#" class="imp-addCart">加入</a></div><div class="imp_item"><a href="#" class="pic"><img src="images/xiez.jpg" width="100" height="100" /></a><p class="tit"><a href="#">日本線行程</a></p><p class="price"><em>$</em>13,000 起</p><a href="#" class="imp-addCart">加入</a></div><div class="imp_item"><a href="#" class="pic"><img src="images/xiez.jpg" width="100" height="100" /></a><p class="tit"><a href="#">日本線行程</a></p><p class="price"><em>$</em>13,000 起</p><a href="#" class="imp-addCart">加入</a></div></div></div>',
            init: $.noop
        },
        mpbtn_wdsc: {
            title: '收藏行程',
            content: '<div class="ibar_plugin_content"><div class="ibar-moudle-product"><div class="imp_item"><a href="#" class="pic"><img src="images/xiez.jpg" width="100" height="100" /></a><p class="tit"><a href="#">日本線行程</a></p><p class="price"><em>$</em>13,000 起</p><a href="#" class="imp-addCart">刪除</a></div><div class="imp_item"><a href="#" class="pic"><img src="images/xiez.jpg" width="100" height="100" /></a><p class="tit"><a href="#">日本線行程</a></p><p class="price"><em>$</em>13,000 起</p><a href="#" class="imp-addCart">刪除</a></div><div class="cart_handler"><a href="#" class="cart_go_btn jiaru" target="_blank">全部加入</a></div></div></div>',
            init: $.noop
        },
        mpbtn_recharge: {
            title: '意見反饋',
            content:
			'<div class="ibar_plugin_content tet">	<form target="_blank" class="ibar_recharge_form">請輸入您對此頁面或網站的建議！<textarea type="text" name="19" placeholder="意見反饋" /><input name="agree" type="checkbox" id="agree" style="vertical-align:middle;">我已仔細閱讀並明瞭「服務條款」「免責聲明」「隱私權聲明」等所載內容及其意義，茲同意該等條款規定，並願遵守網站現今、嗣後規範的各種規則 <div class="ibar_recharge-btn"><input type="submit" value="留言" /></div></form></div> ',

            init: $.noop
        }
    };

    //showQuickPop
    var prevPopType, prevTrigger, doc = $(document), popDisplayed = false, hideQuickPop = function() {
        if (prevTrigger) {
            prevTrigger.removeClass('current');
        }
        popDisplayed = false;
        prevPopType = '';
        quickPop.hide();
        quickPop.animate({
            // left: 280,
            right:-280,
            queue: true
        });
    }, showQuickPop = function(type) {
        if (quickPopXHR && quickPopXHR.abort) {
            quickPopXHR.abort();
        }
        if (type !== prevPopType) {
            var fn = quickDataFns[type];
            quickPop.html(ds.tmpl(popTmpl, fn));
            fn.init.call(this, fn);
        }
        doc.unbind('click.quick_links').one('click.quick_links', hideQuickPop);

        quickPop[0].className = 'quick_links_pop quick_' + type;
        popDisplayed = true;
        prevPopType = type;
        quickPop.show();
        quickPop.animate({
            // left: 0,
            right:40,
            queue: true
        });
    };
    quickShell.bind('click.quick_links', function(e) {
        e.stopPropagation();
    });
    quickPop.delegate('a.ibar_closebtn', 'click', function() {
        quickPop.hide();
        quickPop.animate({
            // left: 280,
            right:-280,
            queue: true
        });
        if (prevTrigger) {
            prevTrigger.removeClass('current');
        }
    });

    //通用事件处理
    var view = $(window)
      , quickLinkCollapsed = !!ds.getCookie('ql_collapse')
      , getHandlerType = function(className) {
        return className.replace(/current/g, '').replace(/\s+/, '');
    }
      , showPopFn = function() {
        var type = getHandlerType(this.className);
        if (popDisplayed && type === prevPopType) {
            return hideQuickPop();
        }
        showQuickPop(this.className);
        if (prevTrigger) {

            prevTrigger.removeClass('current');
        }
        prevTrigger = $(this).addClass('current');
    }
      , quickHandlers = {
        //购物车，最近浏览，商品咨询
        my_qlinks: showPopFn,
        message_list: showPopFn,
        history_list: showPopFn,
        leave_message: showPopFn,
        mpbtn_histroy: showPopFn,
        mpbtn_recharge: showPopFn,
        mpbtn_wdsc: showPopFn,
        //返回顶部
        return_top: function() {
            ds.scrollTo(0, 0);
            hideReturnTop();
        }
    };
    quickShell.delegate('a', 'click', function(e) {
        var type = getHandlerType(this.className);
        if (type && quickHandlers[type]) {
            quickHandlers[type].call(this);
            e.preventDefault();
        }
    });

    //Return top
    var scrollTimer, resizeTimer, minWidth = 1350;

    function resizeHandler() {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(checkScroll, 160);
    }

    function checkResize() {
        quickShell[view.width() > 1340 ? 'removeClass' : 'addClass']('quick_links_dockright');
    }

    function scrollHandler() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(checkResize, 160);
    }

    function checkScroll() {
        view.scrollTop() > 100 ? showReturnTop() : hideReturnTop();
    }

    function showReturnTop() {
        quickPanel.addClass('quick_links_allow_gotop');
    }

    function hideReturnTop() {
        quickPanel.removeClass('quick_links_allow_gotop');
    }
    view.bind('scroll.go_top', resizeHandler).bind('resize.quick_links', scrollHandler);
    quickLinkCollapsed && quickShell.addClass('quick_links_min');
    resizeHandler();
    scrollHandler();
});
