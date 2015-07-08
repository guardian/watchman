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
        var mute =  true;
        @@template@@
        $(".content--interactive").html(template["index.html"]);

        $(window).ready(function() {
            animate.init();
            scrollutils.init();
        });
        
        $('.header__sound-button').on('click',function(e){
            if(!mute){
                $('#background_audio')[0].pause();
                $('.sound-button--off').css('display','block')
                $('.sound-button--on').css('display','none')
            }else{
                $('#background_audio')[0].play();
                $('.sound-button--off').css('display','none')
                $('.sound-button--on').css('display','block')
            }
            mute = !mute;
        })

        
    }

    return {
        init: init
    };
});