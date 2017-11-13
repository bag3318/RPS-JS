// intialize jQuery
jQuery(document).ready(function() {
    var $btn;
    $btn = $("#btn");
    function toolTip($delay) {
        $btn.attr("title", "");        
        $btn.tooltip({
            content: "Click Me!",
            track: true,
            show: {
                effect: "fadeIn",
                delay: $delay
            },
            hide: {
                effect: "fadeOut",
                delay: $delay
            },
            // classes: {
            //     "ui-tooltip": "highlight"
            // }
        });
    }
    toolTip(88);
});
