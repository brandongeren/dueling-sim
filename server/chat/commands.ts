import * as config from '../config/config';
import { addDuel } from '../duels/duels';
import { emitChallenge } from './socket';

export function executeCommand(message: String, from: String) {
  let split = splitCommand(message);
  let cmd = split[0], target = split[1];

  switch(cmd) {
    case 'challenge':
    case 'chall':
      // TODO: put real decks lol
      let id = addDuel([from, target], ['']);
      emitChallenge(from, target, id);
  }

  // TODO: then do the command
}

function splitCommand(message: String) {
  if (!message || !message.trim().length) return;

  // thanks to pokemon showdown for this:
  let cmdToken = message.charAt(0);

  if (!config.COMMAND_TOKENS.includes(cmdToken)) return;
  if (cmdToken === message.charAt(1)) return;

  // the following ~10 lines brought to us by pokemon showdown
  let cmd = '', target = '';

  let spaceIndex = message.indexOf(' ');
  if (spaceIndex > 0) {
    cmd = message.slice(1, spaceIndex).toLowerCase();
    target = message.slice(spaceIndex + 1);
  } else {
    cmd = message.slice(1).toLowerCase();
    target = '';
  }

  if (cmd.endsWith(',')) cmd = cmd.slice(0, -1);

  return [cmd, target];
}