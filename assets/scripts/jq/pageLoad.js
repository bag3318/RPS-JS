// intialize jQuery
jQuery("document").ready(function($state){
    function $consoleLog($isPageLoaded) {
        return console.log("Is page loaded:", $isPageLoaded);
    }
    function $checkIfPageLoadedIsComplete($isReady) {
        var $check;
        $check = ($isReady) ? $consoleLog(Boolean($isReady)) : $consoleLog(Boolean(!$isReady));
    }
    $checkIfPageLoadedIsComplete($state); // returns boolean
}(document.readyState));