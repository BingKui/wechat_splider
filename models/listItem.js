let mongolass = require('../common/mongo');

let ListItem = mongolass.model('listItem', {
	name: {
		type: 'string'
	},
	account: {
		type: 'string'
	},
	desc: {
		type: 'string'
	},
	date: {
		type: 'string'
	},
	url: {
		type: 'string'
	}
});
ListItem.index({
	name: 1
}, {
	unique: true
}).exec();

module.exports = ListItem;