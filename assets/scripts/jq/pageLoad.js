// intialize jQuery
jQuery("document").ready(function(){
    function $consoleLog($isPageLoaded) {
        return console.log("Is page loaded:", $isPageLoaded);
    }
    function $checkIfPageLoadedIsComplete($isReady) {
        if ($isReady) {
            $consoleLog(Boolean($isReady));
        } else {
            $consoleLog(Boolean(!$isReady));
        }
    }
    $checkIfPageLoadedIsComplete(document.readyState);
});