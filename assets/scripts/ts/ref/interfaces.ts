export interface GameInfo {
  game_name: string;
  version: number;
  creator: string;
  status_ok: boolean;
}
export interface Rules {
  [index: string]: string;
}