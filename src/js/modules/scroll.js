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
        this.dividerTransforms();
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
            windowPositions.push($(el).offset().top - 24)
        });
    },

    windows: function() {
        $('.watchman__window').each(function(i, el) {
            var $window = $(el);
            var $container = $(el).parent().parent();
            var isInView = scrollTop > windowPositions[i];
            var isAboveView = $container.height() + $container.offset().top - $window.height() - 48 < scrollTop;

            if (isAboveView) {
                $window.removeClass('is-fixed').addClass('is-above');
            } else if (isInView) {
                $window.removeClass('is-above').addClass('is-fixed');
            } else {
                $window.removeClass('is-fixed is-above');
            }
        })
    },

    dividerTransforms: function() {
        $('.is-transformable').each(function(i, el) {
            var $parent = $(el).parent();
            var start = $parent.offset().top - height;
            var end = $parent.offset().top + $parent.outerHeight();

            if (scrollTop > start && scrollTop < end) {
                var startValues = $(el).data('start').split(',');
                var endValues = $(el).data('end').split(',');
                var unit = $(el).data('unit') || 'px';
                var percentage = (end - scrollTop) / (height + $parent.outerHeight()) * 100;

                var xDifferencePoint = (startValues[0] - endValues[0]) / 100;
                var yDifferencePoint = (startValues[1] - endValues[1]) / 100;

                $(el).css("transform", `translate(${xDifferencePoint * percentage}${unit}, ${yDifferencePoint * percentage}${unit})`)
            }
        });
    }
};
