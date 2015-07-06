define([
    'libs/jquery',
    'modules/animate'
], function(
    jQuery,
    animate
) {
    'use strict';

    function init(el) {
        var mute =  false;
        @@template@@
        console.log('hey')
        $(".content--interactive").html(template["index.html"]);

        $(window).ready(function() {
            animate.init();
        });
        $('.header__sound-button').on('click',function(e){
            console.log($('#background_audio'))
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