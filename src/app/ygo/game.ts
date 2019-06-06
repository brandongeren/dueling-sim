export interface IGameState {

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
  set_tag: Array<String>,
  setcode: Array<String>,
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
  linkmarkers?: Array<String>,
}

export interface IUnknownCard {
  image_url: String;
}