	var request = require('request'); // lets you connect to web pages

	var cheerio = require('cheerio'); // cheerio mimics the DOM and jQuery/CSS style selectors


	request (/* load url from queue here*/), function(err,resp,body) {
		
		$ = cheerio.load(body);
		
		console.log ('Address:' + $('.detailsKeyPropertyDetails h1').text());
		console.log ('Rooms:' + $('.detailsKeyPropertyDetails h2').text());
		console.log ('Description:' + $('.detailsDescription').text());
		console.log('Images:');
		links = $('.ad-thumbs a');
		$(links).each(function (i,link) {
			console.log($(link).text() + '\n ' + $(link).attr('href'));
		});
	});
