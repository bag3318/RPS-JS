// intialize jQuery
$(document).ready(function() {
    var $btn;
    $btn = $("#btn");
    $(function() {
        $btn.attr("title", "");        
        $btn.tooltip({
            content: "Click Me!",
            track: true,
            show: {
                effect: "slideDown",
                delay: 88
            },
            hide: {
                effect: "slideUp",
                delay: 88
            },
            // classes: {
            //     "ui-tooltip": "highlight"
            // }
        });
    });
});
