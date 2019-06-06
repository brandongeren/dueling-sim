const uuid = require('uuid/v4')

// TODO: typescript-ify this whole file (it would really help with the goofy function args)

// Creates a room object
// pm argument is true if the room is a direct message
function createRoom({messages = [], name, users = [], pm = false} = {}) {
	let id = '';
	// if the message is a pm, then the room id is the concatenations of the user id's
	// we sort the users first so that this room id is unique for each distinct list of users
	// this is the operation necessary to find an existing dm
	// TODO: abstract this out into a function
	// args: array of users
	// output: unique room id for the pm's between those users
	if (pm) {
		users = users.sort();
		for (user of users) {
			id = id.concat([user.id, "-"]);
		}
	} else {
		id = uuid();
	}

	let room = {
		id,
		name,
		messages,
		users,
		typingUsers: [],
	};	

	return room;
}

module.exports = createRoom;