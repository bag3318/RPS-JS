// reference required scripts
/// <reference path="../main.ts" />

import {RPS} from "./../main"

function loadScript() {
  let script: RPS = new RPS(GAME_INFO);
  script.Init();
}
loadScript();
