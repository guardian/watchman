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
        var voiceoverAudio =  new Howler.Howl({
            urls: ['http://audio.theguardian.tv/audio/kip/environment/series/the-biggest-story-in-the-world/1426088034653/373/gnl.story.150311.jp.biggest_story_episode1.mp3']
        })
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

        $('.audiobook__button').on('click',function(e){
            voiceoverplaying = !voiceoverplaying;

            if(voiceoverplaying){  
                $('.audiobook__icon--play').css('display','none');
                $('.audiobook__icon--pause').css('display','block');
                voiceoverAudio.play();
                scrollutils.muteSwitch(true); 
            }else{
                $('.audiobook__icon--play').css('display','block')
                $('.audiobook__icon--pause').css('display','none')
                voiceoverAudio.pause();
            }

               
        })

        
    }

    return {
        init: init
    };
});