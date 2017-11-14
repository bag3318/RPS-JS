// intialize jQuery
jQuery("document").ready(function(){
    function $consoleLog($isPageLoaded) {
        return console.log("Is page loaded:", $isPageLoaded);
    }
    function $checkIfPageLoadedIsComplete() {
        if (document.readyState) {
            $consoleLog(true);
        } else {
            $consoleLog(false);
        }
    }
    $checkIfPageLoadedIsComplete();
});