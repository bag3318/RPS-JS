// intialize jQuery
jQuery("document").ready(function(){
    function $consoleLog($isPageLoaded) {
        return console.log("Is page loaded:", $isPageLoaded);
    }
    function $checkIfPageLoadedIsComplete($isReady) {
        var $check = ($isReady) ? $consoleLog(Boolean($isReady)) : $consoleLog(Boolean(!$isReady));
    }
    $checkIfPageLoadedIsComplete(document.readyState);
});