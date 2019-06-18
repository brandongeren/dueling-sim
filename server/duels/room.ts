import { IGameState } from '../../ygo/game';

export interface IDuelRoom {
  // represent players as just their username
  // username uniquely identifies a player, and we don't need any more information to perform database actions
  players: String[],
  gameState: IGameState,
  id: String,
}

// TODO: might be necessary to move classes to another file and make this one a .d.ts file
export class DuelRoom implements IDuelRoom {
  players: String[];
  gameState: IGameState;
  id: String;

  /*  TODO: initialization:
      this class should be initialized with new player objects made from the players in the duel
      the gameState should be created using a new gameState method that creates a gameState with the 2 players' decks
          (put decks in random order)
  */
  constructor(players: String[], gameState: IGameState, id: String) {
    this.players = players;
    this.gameState = gameState;
    this.id = id;
  }

  // increase or decrease the life points of a player
  // TODO: we will use LP as our first test that the duel is working properly
  updateLP(username: String, change: Number) {
    // TODO: update the type of change to be bigint
    // problem: bigint type is only available in typescript 3.2 or higher, 
    // which requires updating all of the angular stuff to match it
    this.gameState.updateLP(username, change);
  }

  /* 
  TODO: add in all of the other commands like:
  moveCard
  shuffleHand
  draw
  */
}