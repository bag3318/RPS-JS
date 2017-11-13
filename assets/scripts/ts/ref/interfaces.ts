interface GameInfo {
  game_name: string;
  version: number;
  creator: string;
  status_ok: boolean;
}
interface Rules {
  [index: string]: string;
}