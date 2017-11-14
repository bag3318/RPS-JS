// intialize jQuery
jQuery(document).ready(function() {
    var $btn;
    $btn = $("#btn");
    function $toolTip($delayTime) {
        $btn.attr("title", "");        
        $btn.tooltip({
            content: "Click Me!",
            track: true,
            show: {
                effect: "fadeIn",
                delay: $delayTime
            },
            hide: {
                effect: "fadeOut",
                delay: $delayTime
            },
            // classes: {
            //     "ui-tooltip": "highlight"
            // }
        });
    }
    $toolTip(88);
});
