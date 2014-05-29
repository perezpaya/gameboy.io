var Emulator = require(__dirname + '/lib/emulator');
var emulator = new Emulator();

// Redis <3
var redis = require('redis');
var publisher = redis.createClient();
var subscriber = redis.createClient();

// gets buffer of rom by id
var roms = require(__dirname + '/lib/roms');
var rom = roms.getRomById('poke_silver.gbc');

emulator.on('frame', function (frame){
	publisher.publish('picture', frame.toString('base64'));
});

subscriber.subscribe('command');

subscriber.on('message', function (channel, msg){

	switch (channel) {
		case 'command':
			emulator.move(msg);
			break;
		default:
			console.log('unhandled subscribed event');
	}

});

emulator.initWithRom(rom);
emulator.run();