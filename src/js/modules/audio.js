import {Howler, Howl} from 'howler';

let muted = false,
    ambientLoaded = false,
    ambientPlaying = false,
    ambientAudio = [],
    voiceoverPlaying = false,
    voiceoverLoaded = false,
    voiceoverAudio

export default {
    init: function() {
        this.muteOnMobile();
        this.bindings();
    },

    bindings: function() {
        $('.ambient__icon').on('click', function() {
            this.toggleAmbientAudio();
        }.bind(this));

        $('.audiobook__button').on('click', function() {
            this.toggleAudioBookAudio();
        }.bind(this))
    },

    muteOnMobile: function() {
        if((/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera) && window.innerWidth < 980){
            muted = true;
        }
    },

    toggleAmbientAudio: function() {
        muted = !muted;
        ambientPlaying = !ambientPlaying;

        if (muted) {
            $('.ambient__icon--off').css('display','block');
            $('.ambient__icon--on').css('display','none');
        } else {
            $('.ambient__icon--off').css('display','none');
            $('.ambient__icon--on').css('display','block');
        }

        if (ambientPlaying) {
            if (!voiceLoaded) {
                ambientAudio.push(new Howl({
                  src: ['http://interactive.guim.co.uk/2015/07/watchman-audio/v2/1-train-interior.mp3'],
                  volume: 0,
                  loop:true
                }));

                ambientAudio.push(new Howl({
                  src: ['http://interactive.guim.co.uk/2015/07/watchman-audio/v2/2-train-interior.mp3'],
                  volume: 0,
                  loop:true
                }));

                ambientAudio.push(new Howl({
                  src: ['http://interactive.guim.co.uk/2015/07/watchman-audio/v2/2-train-exterior.mp3'],
                  volume: 0,
                  loop:true
                }));

                ambientAudio.push(new Howl({
                  src: ['http://interactive.guim.co.uk/2015/07/watchman-audio/v2/3-car-interior.mp3'],
                  volume: 0,
                  loop:true
                }));
            }
        }
    },

    toggleAudioBookAudio: function() {
        voiceoverPlaying = !voiceoverPlaying;

        if(voiceoverPlaying) {
            if(!voiceoverLoaded){
                voiceoverAudio =  new Howl({
                    src: ['http://interactive.guim.co.uk/2015/07/watchman-audio/v2/voiceover_final.mp3'],
                    buffer: true
                })
            }

            $('.audiobook__icon--play').css('display','none');
            $('.audiobook__icon--pause').css('display','block');

            $('.ambient__icon--off').css('display','block')
            $('.ambient__icon--on').css('display','none')

            $('.watchman__menu-segment--ambient').addClass('voiceoverplaying')
            voiceoverAudio.play();
            voiceoverLoaded = true;
            muted = true;
            // scrollutils.muteSwitch(muted);
        } else {
            $('.audiobook__icon--play').css('display','block')
            $('.audiobook__icon--pause').css('display','none')
            $('.watchman__menu-segment--ambient').removeClass('voiceoverplaying')
            voiceoverAudio.pause();
        }
    }
};
