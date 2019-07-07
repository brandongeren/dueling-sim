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
  constructor(players: String[], id: String) {
    this.players = players;
    this.gameState = new GameState(players);
    this.id = id;
  }

  // increase or decrease the life points of a player
  // TODO: we will use LP as our first test that the duel is working properly
  updateLP(username: String, change: number) {
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

export interface IGameState {
  // TODO: String might not be the best data structure to represent a player username

  // the players map uses player usernames to their player gamestate 
  // TODO: perhaps this should use the Player interface
  players: Map<String, IPlayerGameState>,
  turnPlayer?: String,
  // TODO: make phases into a real type
  phase?: String,

  // lifepoints is a map from player usernames to their lifepoints as a number
  // TODO: make this an integer type
  lifepoints: Map<String, number>,

  // target is a map from player usernames to the card they are pointing at
  // useful for cards like mystical space typhoon that require selecting a target
  // target should be optional
  target?: Map<String, IZone>,

  updateLP(player: String, change: number);

  // TODO: create extra monster zones here
}

export class GameState implements IGameState {
  players: Map<String, IPlayerGameState>;
  turnPlayer?: String;
  phase?: String;
  lifepoints: Map<String, number>;
  target?: Map<String, IZone>;

  constructor(players: String[]) {
    this.players = new Map<String, IPlayerGameState>();
    this.lifepoints = new Map<String, number>();

    for (let player of players) {
      // TODO: create a format object that specifies details at creation of the duel, such as starting LP
      // Format object includes details that make a format different from any other
      this.lifepoints.set(player, 8000);
      this.players.set(player, new PlayerGameState());
    }
  }

  updateLP(player: String, change: number) {
    let curLP: number = this.lifepoints.get(player);
    this.lifepoints.set(player, curLP + change);
  }
}

export interface IPlayerGameState {
  // TODO: make these things not optional
  hand?: GameCard[],
  banish?: GameCard[],
  deck?: GameCard[],
  extra?: GameCard[],
  // graveyard is of type ICard because it is always public information
  grave?: ICard[],
  s1?: IZone,
  s2?: IZone,
  s3?: IZone,
  s4?: IZone,
  s5?: IZone,
  m1?: IMonsterZone,
  m2?: IMonsterZone,
  m3?: IMonsterZone,
  m4?: IMonsterZone,
  m5?: IMonsterZone,
}

export class PlayerGameState {
  constructor() {
    
  }
}

export interface IZone {
  card?: GameCard,
  faceup?: Boolean,
  removeCard(),
}

// TODO: might want to move this to another file and make this one a .d.ts file
export class Zone implements IZone {
  card?: GameCard;
  faceup?: Boolean;
 
  constructor() { }

  removeCard() {
    this.card = undefined;
    this.faceup = undefined;
  }
}

export interface IMonsterZone extends IZone {
  // atkPosition is true if the monster is in atk position
  atkPosition: Boolean,
}

export class MonsterZone extends Zone implements IMonsterZone {
  atkPosition: boolean;

  constructor(atkPosition: boolean) {
    super();
    this.atkPosition = atkPosition;
  }
}

export type GameCard = ICard|IUnknownCard;

export interface ICard {
  // mandatory properties
  passcode: String,
  name: String,
  // type refers to Monster, Spell, Trap, etc
  type: String,
  desc: String,
  // race refers to monster type (spellcaster, warrior, etc)
  // race is also used to refer to spell/trap type (counter, continuous, equip, etc)
  race: String,
  set_tag: String[],
  setcode: String[],
  // TODO: figure out how the sim is going to handle card images
  image_url: String,

  // optional properties that are available for all cards
  archetype?: String,

  // monster card properties
  // TODO: evaluate if monsters should be a separate type
  level?: String,
  atk?: String,
  def?: String,
  attribute?: String,

  // pendulum monster card properties
  // TODO: evaluate if pendulum monsters should be a separate type
  scale?: String,

  // link monster card properties
  // TODO: evaluate if link monsters should be a separate type
  linkval?: String,
  linkmarkers?: String[],
}

export class Card implements ICard {
  passcode: String;
  name: String;
  type: String;
  desc: String;
  race: String;
  set_tag: String[];
  setcode: String[];
  image_url: String;
  archetype?: String;
  level?: String;
  atk?: String;
  def?: String;
  attribute?: String;
  scale?: String;
  linkval?: String;
  linkmarkers?: String[];

  constructor(
    passcode: String,
    name: String,
    type: String,
    desc: String,
    race: String,
    set_tag: String[],
    setcode: String[],
    image_url: String,
    archetype?: String,
    level?: String,
    atk?: String,
    def?: String,
    attribute?: String,
    scale?: String,
    linkval?: String,
    linkmarkers?: String[],
  ) {
    this.passcode = passcode;
    this.name = name;
    this.type = type;
    this.desc = desc;
    this.race = race;
    this.set_tag = set_tag;
    this.setcode = setcode;
    this.image_url = image_url;
    this.archetype = archetype;
    this.level = level;
    this.atk = atk;
    this.def = def;
    this.attribute = attribute;
    this.scale = scale;
    this.linkval = linkval;
    this.linkmarkers = linkmarkers;
  }
}
export interface IUnknownCard {
  image_url: String;
}

export class UnknownCard implements IUnknownCard{
  image_url: String;
  
  constructor() {
    this.image_url = 'https://vignette.wikia.nocookie.net/yugioh/images/d/d7/Back-Anime-DM.png/revision/latest?cb=20071029201207';
  }
}