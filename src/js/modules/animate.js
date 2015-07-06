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
            if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera) && window.innerWidth > 980){
                Skrollr.init({
                    forceHeight: false,
                    skrollrBody: 'js-context',
                    render: function(data) {
                        scrollTop = data.curTop;
                    }.bind(this)
                });
            } else {
                $(window).scroll(function() {
                    scrollTop = $(window).scrollTop();
                }.bind(this));
            }
        }
    };
});