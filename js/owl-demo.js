$(function () {
    $('#owl-demo').owlCarousel({
        items: 1,
        singleItem:true,
        autoPlay: true
    });

    $('#owl-demo2').owlCarousel({
        items: 2,
        autoPlay: true,
        itemsMobile: [480, 2],//手機可顯示圖片張數
        itemsDesktopSmall: [1024, 2] //平板可顯示圖片張數

    });

    $('#owl-demo3').owlCarousel({
        items: 3,
        autoPlay: true
    });

    $('#owl-demo4').owlCarousel({
        items: 3,
        autoPlay: true
    });
    $('.owl-2p').owlCarousel({
        items : 2,
        itemsCustom : false,
        itemsDesktop : [1199, 2],
        itemsDesktopSmall : [979,2],
        itemsTablet : [768, 2],
        itemsTabletSmall : false,
        itemsMobile : [479, 1],
        singleItem : false,
        itemsScaleUp : false,
        loop:true,
        autoPlay: true,
        autoplayTimeout:6000,
        autoplayHoverPause:true,
        touchDrag:true,
        mouseDrag:true,
        responsiveClass:true
    });

    $('.owl-carousel3p').owlCarousel({
        items : 3,
        itemsCustom : false,
        itemsDesktop : [1199, 3],
        itemsDesktopSmall : [979,3],
        itemsTablet : [768, 3],
        itemsTabletSmall : false,
        itemsMobile : [479, 2],
        singleItem : false,
        itemsScaleUp : false,
        loop:true,
        margin: 100,
        autoPlay: true,
        autoplayTimeout:6000,
        autoplayHoverPause:true,
        touchDrag:true,
        mouseDrag:true,
        responsiveClass:true
    });
    $('.bn-title').owlCarousel({
        items : 1,
        itemsCustom : false,
        itemsDesktop : [1199, 1],
        itemsDesktopSmall : [979,1],
        itemsTablet : [768, 1],
        itemsTabletSmall : false,
        itemsMobile : [479, 1],
        singleItem : false,
        itemsScaleUp : false,
        loop:true,
        autoPlay: true,
        autoplayTimeout:6000,
        autoplayHoverPause:true,
        dots:true,
        touchDrag:true,
        mouseDrag:true,
        responsiveClass:true,
    });

    $('.owl-carousel').owlCarousel({
        items: 3,
        loop:true,
        autoPlay: true,
        autoplayTimeout:6000,
        autoplayHoverPause:true,
        dots:true,
        touchDrag:true,
        mouseDrag:true,
        responsiveClass:true,
        responsive:{
        0:{
            items:1,
            loop:false
        },
        600:{
            items:2,
            loop:false
        },
        1000:{
            items:2
        }
        
       }
    });



});
/*owl link:http://www.dowebok.com/93.html*/