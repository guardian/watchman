import audio from '../modules/audio.js';

let height, scrollTop;
let windowPositions = [];

export default {
    init: function() {
        this.setValues();
        this.onScroll();
        this.saveWindowPositions();
        this.bindings();
    },

    bindings: function() {
        $(window).scroll(function() {
            this.setValues();
            this.onScroll();
        }.bind(this))

        $(window).resize(function() {
            this.setValues();
            this.saveWindowPositions();
            this.onScroll();
        }.bind(this));
    },

    setValues: function() {
        height = $(window).height();
        scrollTop = $(window).scrollTop();
    },

    onScroll: function() {
        this.audioTriggers();
        this.windows();
    },

    audioTriggers: function() {
        let audioTrigger = 0;

        $('.audio-section').each(function(i, el) {
            if (scrollTop > $(el).offset().top) {
                audioTrigger = i;
            }
        })

        audio.switchAmbientAudio(audioTrigger);
    },

    saveWindowPositions: function() {
        $('.watchman__window').removeClass('is-fixed is-above');

        $('.watchman__window').each(function(i, el) {
            windowPositions.push($(el).offset().top);
        });
    },

    windows: function() {
        $('.watchman__window').each(function(i, el) {
            var $window = $(el);
            var $container = $(el).parent().parent();
            var isInView = scrollTop > windowPositions[i];
            var isAboveView = $container.height() + $container.offset().top - $window.height() < scrollTop;

            if (isAboveView) {
                $window.removeClass('is-fixed').addClass('is-above');
            } else if (isInView) {
                $window.removeClass('is-above').addClass('is-fixed');
            } else {
                $window.removeClass('is-fixed is-above');
            }
        })
    }
};
