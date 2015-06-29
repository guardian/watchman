define([
    'libs/jquery',
    'modules/animate'
], function(
    jQuery,
    animate
) {
    'use strict';

    function handleRequestError(err, msg) {
        console.error('Failed: ', err, msg);
    }
    function afterRequest(resp) {
        // console.log('Finished', resp);
    }

    function init(el) {
        @@template@@
        $(".content--interactive").html(template["index.html"]);

        $(window).ready(function() {
            animate.init();
        });
    }

    return {
        init: init
    };
});