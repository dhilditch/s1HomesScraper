	
    var request = require('request'); // lets you connect to web pages

	var cheerio = require('cheerio'); // cheerio mimics the DOM and jQuery/CSS style selectors




	for (counter=1;counter<3;counter++) {
		var url = 'http://www.s1homes.com/property-for-sale/forsale_search_results.cgi?type=House&newhomes=yes&sort=da&page=' +counter;

		request(url, {proxy: 'http://localhost:8888'}, function(err, resp, body) {

			if (err)

				throw err;

			$ = cheerio.load(body);

			$('.imgPlaceholder a:contains()').each(function() {

				console.log ('http://www.s1homes.com/' + $(this).attr('href'));

				//output ('http://www.s1homes.com/' + $(this).attr('href'), to queue

				
			});
		}); 
	}
