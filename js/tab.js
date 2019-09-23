        window.onload = function () {
            jQuery(document).ready(function ($) {

                $.effects.effect.heightFade = function (o, done) {
                    var el = $(this),
                        mode = $.effects.setMode(el, o.mode || "show");
                    el.animate({
                        height: mode,
                        opacity: mode
                    }, {
                            queue: false,
                            complete: done
                        });
                };

                $(".tab_block").tabs({
                    collapsible: true,
                    // active: 'none', 預設是否開始要打開第一個tab內容
                    hide: "heightFade",
                    show: "heightFade",
                });
                return false;


            });
            



        }


