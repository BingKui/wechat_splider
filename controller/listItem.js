let listItem = require('../models/listItem');

module.exports = {
	addOneItem: (item) => {
		return listItem.create(item).exec();
	},
	updateOneById: (id, data) => {
		return listItem.update({
			_id: id
		}, {
			$set: data
		}).exec()
	},
	getItemByname: (name) => {
		return listItem.findOne({
			name: name
		}).exec();
	},
	getAll: () => {
		return listItem.find({}).exec();
	},
	getOneByIndex: (_index) => {
		if (!isNaN(_index)) {
			_index = parseInt(_index);
		}
		return listItem.find({}).skip(_index).limit(1).exec();
	}
};