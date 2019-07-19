import audio from '../modules/audio.js';

let height, scrollTop;

export default {
    init: function() {
        this.setValues();
        this.onScroll();
        this.bindings();
    },

    bindings: function() {
        $(window).scroll(function() {
            this.setValues();
            this.onScroll();
        }.bind(this))
    },

    setValues: function() {
        height = $(window).height();
        scrollTop = $(window).scrollTop();
    },

    onScroll: function() {
        this.audioTriggers();
    },

    audioTriggers: function() {
        let audioTrigger = 0;

        $('.audio-section').each(function(i, el) {
            if (scrollTop > $(el).offset().top) {
                audioTrigger = i;
            }
        })

        audio.switchAmbientAudio(audioTrigger);
    }
};
