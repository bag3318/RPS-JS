// intialize jQuery
jQuery(document).ready(function() {
    var $btn;
    $btn = $("#btn");
    $btn.attr("title", "");            
    function $toolTip($delayTime) {
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
