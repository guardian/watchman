define([
    'libs/jquery'
], function(
    jQuery
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
            // Do canvasy stuff here I guess
        });
    }

    return {
        init: init
    };
});