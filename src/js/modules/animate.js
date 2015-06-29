define([
    'libs/jquery',
    'libs/skrollr'
], function(
    jQuery,
    Skrollr
) {
    var scrollTop = 0;

    return {
        init: function() {
            if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
                Skrollr.init({
                    forceHeight: false,
                    skrollrBody: 'js-context',
                    render: function(data) {
                        scrollTop = data.curTop;
                        console.log(scrollTop);
                    }.bind(this)
                });
            } else {
                $(window).scroll(function() {
                    scrollTop = $(window).scrollTop();
                    console.log(scrollTop);
                }.bind(this));
            }
        }
    };
});