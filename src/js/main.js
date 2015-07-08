define([
    'libs/jquery',
    'modules/animate',
    'modules/scrollutils'
], function(
    jQuery,
    animate,
    scrollutils
) {
    'use strict';

    function init(el) {
        var muted =  false;
        @@template@@
        $(".content--interactive").html(template["index.html"]);

        $(window).ready(function() {
            animate.init();
            scrollutils.init();
        });

        $('.ambient__button').on('click',function(e){
            muted = !muted;

            if(muted){  
                $('.ambient__icon--off').css('display','block')
                $('.ambient__icon--on').css('display','none')
            }else{
                $('.ambient__icon--off').css('display','none')
                $('.ambient__icon--on').css('display','block')
            }

            scrollutils.muteSwitch(muted);    
        })

        
    }

    return {
        init: init
    };
});