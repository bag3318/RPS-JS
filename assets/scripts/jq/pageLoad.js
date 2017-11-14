// intialize jQuery
jQuery("document").ready(function($docState){
    function $consoleLog($isPageLoaded) {
        return console.log("Is page loaded:", $isPageLoaded);
    }
    function $checkIfPageLoadedIsComplete($isReady) {
        var $check;
        $check = ($isReady) ? $consoleLog(Boolean($isReady)) : $consoleLog(Boolean(!$isReady));
    }
    $checkIfPageLoadedIsComplete($docState);
}(document.readyState));