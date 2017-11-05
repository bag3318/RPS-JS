"use strict";
function loadScript() {
    var script = new RPS($info.game_name, $info.version, $info.creator, $info.status_ok);
    script.Init();
}
loadScript();
