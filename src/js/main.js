define([
    'libs/jquery',
    'modules/animate',
    'modules/lazyload'
], function(
    jQuery,
    animate,
    lazyload
) {
    'use strict';

    function init(el) {
        var mute =  true;
        @@template@@
        $(".content--interactive").html(template["index.html"]);

        $(window).ready(function() {
            animate.init();
            lazyload.init();
        });

        $('.ambient__button').on('click',function(e){
            if(!mute){
                $('#background_audio')[0].pause();
                $('.ambient__icon--off').css('display','block')
                $('.ambient__icon--on').css('display','none')
            }else{
                $('#background_audio')[0].play();
                $('.ambient__icon--off').css('display','none')
                $('.ambient__icon--on').css('display','block')
            }
            mute = !mute;
        })

        
    }

    return {
        init: init
    };
});