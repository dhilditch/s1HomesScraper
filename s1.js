	
    var request = require('request'); // lets you connect to web pages

	var cheerio = require('cheerio'); // cheerio mimics the DOM and jQuery/CSS style selectors




	for (counter=1;counter<3;counter++) {
		var url = 'http://www.s1homes.com/property-for-sale/forsale_search_results.cgi?type=House&newhomes=yes&sort=da&page=' +counter;

		request(url, {proxy: 'http://localhost:8888'}, function(err, resp, body) {

			if (err)

				throw err;

			$ = cheerio.load(body);

			$('.imgPlaceholder a:contains()').each(function() {

				console.log ($(this).attr('href'));

				request ('http://www.s1homes.com/' + $(this).attr('href'), function(err,resp,body) {
					//looks for meta tag with property og:url and takes the url that is assigned to content and then prints it out 
					$ = cheerio.load(body);
					//scrapeid = $('meta[name="description"]').attr('content');
					//console.log ('ID:' + $('a[class="schedule_download"]').attr('href'));

					console.log ('Address:' + $('.detailsKeyPropertyDetails h1').text());
					console.log ('Rooms:' + $('.detailsKeyPropertyDetails h2').text());
					console.log ('Description:' + $('.detailsDescription').text());
					console.log ('Schedule:' + $('#but1 a:contains()').attr('href'));
					console.log('Estate Agent' + $('.request_details_telephone_wrapper strong:contains()').text());
					console.log('Images:');

					links = $('.ad-thumbs a');
					$(links).each(function (i,link) {
						console.log($(link).text() + '\n ' + $(link).attr('href'));
					});

				});
			});
		}); 
	}

					/*json = {
						'Address': $('.detailsKeyPropertyDetails h1').text(),
						'Rooms': $('.detailsKeyPropertyDetails h2').text(),
						'Description': $('.detailsDescription').text(),
						'Schedule': $('#but1 a:contains()').attr('href'),
						'Images':
					}
					*/