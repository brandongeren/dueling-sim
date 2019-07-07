import { DuelRoom } from "../../ygo/game";

let duels = new Map<String, DuelRoom>();

// TODO: when server exits, save this number to a file
// on startup, read the number and initialize to that
let duelNumber = 0;

export function addDuel(players: String[], decks: String[]) {
  let id = '' + duelNumber;
  let duel = new DuelRoom(players, id);
  duels.set(id, duel);
  duelNumber++;
  return id;
}

// TODO: rename function to not be the same as the front end one
export function getDuelById(id: String) {
  return duels.get(id);
}