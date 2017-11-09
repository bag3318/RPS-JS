function loadScript(): void {
  let script: RPS = new RPS($INFO.game_name, $INFO.version, $INFO.creator, $INFO.status_ok);
  script.Init("click");
}
loadScript();
