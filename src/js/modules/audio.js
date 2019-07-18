import {Howler, Howl} from 'howler';

let muted = false,
    ambientPlaying = true,
    ambientLoaded = false,
    ambientAudio = [],
    ambientTrack = 0,
    voiceoverPlaying = false,
    voiceoverLoaded = false,
    voiceoverAudio

export default {
    init: function() {
        this.muteOnMobile();
        this.initAmbientAudio();
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

    initAmbientAudio: function() {
        if (!ambientLoaded) {
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
            ambientLoaded = true;
            ambientAudio[ambientTrack].play();
            ambientAudio[ambientTrack].fade(0, 0.8, 4000);
        }
    },

    toggleAmbientAudio: function() {
        ambientPlaying = !ambientPlaying;

        if (ambientPlaying) {
            ambientAudio[ambientTrack].play();
            ambientAudio[ambientTrack].fade(0, 0.8, 4000);
            $('.ambient__icon--off').css('display','none');
            $('.ambient__icon--on').css('display','block');
        } else {
            ambientAudio[ambientTrack].fade(0.8, 0, 2000);
            $('.ambient__icon--off').css('display','block');
            $('.ambient__icon--on').css('display','none');
        }
    },

    switchAmbientAudio: function(newTrack) {
        if (ambientPlaying) {
            ambientAudio[newTrack].play();
            ambientAudio[newTrack].fade(0, 0.8, 4000);
            ambientAudio[ambientTrack].fade(0.8, 0, 4000, function() {
                ambientAudio[ambientTrack].pause();
            });

            ambientTrack = newTrack;
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
