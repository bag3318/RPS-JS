// intialize jQuery
jQuery("document").ready(function($docReadyState){
    function $consoleLog($isPageLoaded) {
        return console.log("Is page loaded:", $isPageLoaded);
    }
    function $checkIfPageLoadedIsComplete($isReady) {
        var $check;
        $check = ($isReady) ? $consoleLog(Boolean($isReady)) : $consoleLog(Boolean(!$isReady));
    }
    $checkIfPageLoadedIsComplete($docReadyState);
}(document.readyState));