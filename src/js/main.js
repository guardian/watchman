define([
    'libs/jquery',
    'modules/animate',
    'modules/scrollutils',
    'libs/howler'
], function(
    jQuery,
    animate,
    scrollutils,
    Howler
) {
    'use strict';

    function init(el) {
        var muted =  false;
        var voiceoverplaying = false;
        var voiceoverLoaded = false;
        var voiceoverAudio;

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

        if((/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera) && window.innerWidth < 980){
            muted = true;
        }

        $('.audiobook__button').on('click',function(e){
            voiceoverplaying = !voiceoverplaying;

            if(voiceoverplaying){  
                if(!voiceoverLoaded){
                    voiceoverAudio =  new Howler.Howl({
                        urls: ['http://interactive.guim.co.uk/2015/07/watchman-audio/v2/voiceover_final.mp3'],
                        buffer:true
                    })
                }
                
                $('.audiobook__icon--play').css('display','none');
                $('.audiobook__icon--pause').css('display','block');

                $('.ambient__icon--off').css('display','block')
                $('.ambient__icon--on').css('display','none')

                $('.watchman__menu-segment--ambient').addClass('voiceoverplaying')
                voiceoverAudio.play();
                voiceoverLoaded =  true;
                muted = true;
                scrollutils.muteSwitch(muted); 
            }else{
                $('.audiobook__icon--play').css('display','block')
                $('.audiobook__icon--pause').css('display','none')
                $('.watchman__menu-segment--ambient').removeClass('voiceoverplaying')
                voiceoverAudio.pause();
            }

               
        })

        
    }

    return {
        init: init
    };
});