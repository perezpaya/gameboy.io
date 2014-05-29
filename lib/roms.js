var fs = require('fs');
var config = require(__dirname + '/../config.json');

function getRomById (id){
	
	return fs.readFileSync(__dirname + '/../' + config.roms.path + '/' + id);

};

function getSaveStateById (id){

	return 'penis';

};

module.exports = {
	getRomById: getRomById,
	getSaveStateById: getSaveStateById
}