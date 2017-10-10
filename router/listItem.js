let express = require('express');
let router = express.Router();
let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');
let log4js = require('log4js');
let logger = log4js.getLogger("tags");
let config = require('../config/config');
let ItemModel = require('../controller/listItem');

let splidStr = encodeURI('人工智能');
router.get('/', (req, res, next) => {
	logger.info('爬取地址: ' + config.crawlerUrl + encodeURI("人工智能+教程"));
	for (let i = 1; i < 101; i++) {
		(() => {
			setTimeout(function() {
				const _url = `${config.crawlerUrl}${splidStr}&page=${i}`;
				logger.info(_url);
				request(_url, (error, response, body) => {
					logger.info(response.statusCode);
					if (!error && response.statusCode == 200) {
						let $ = cheerio.load(body);
						logger.info(body);
						let items = $('#wrapper .news-list').find("li");
						for (let i = 0; i < items.length; i++) {
							let _this = $(items[i]);
							let _url = _this.find(".txt-box h3").find('a').attr('href');
							let _item = {
								name: _this.find(".txt-box h3").text().trim(),
								account: _this.find(".s-p .account").text(),
								desc: _this.find(".txt-box .txt-info").text(),
								date: _this.find(".txt-box .s-p .s2").text(),
								url: _url
							};
							logger.info(_item);
							ItemModel.addOneItem(_item);
						}
					} else {
						logger.error(error);
					}
				});
			}, i * 5000);
		})(i)
	}
});



module.exports = router;