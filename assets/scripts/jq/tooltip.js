$(document).ready(function() {
    var $btn = $("#btn");
    $btn.tooltip({
        content: "Click Me!",
        track: true,
        show: {
            effect: "slideDown",
            delay: 100
        },
        hide: {
            effect: "slideUp",
            delay: 100
        },
        // classes: {
        //     "ui-tooltip": "highlight"
        // }
    });
});