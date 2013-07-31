var request = require('request'); // lets you connect to web pages

var cheerio = require('cheerio'); // cheerio mimics the DOM and jQuery/CSS style selectors

var url = 'http://www.s1homes.com/Houses-for-sale/';

/*
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
			//console.log ('Image:' +$('.ad-thumbs ul').html());
			//console.log ('Image2:' + $('.ad-thumbs ul').attr('img src','href'));
			//console.log ('Image3:' + $('.ad-thumbs ul').html($("<img src>").attr("href")));

			links = $('.ad-thumbs a');
			$(links).each(function (i,link) {
				console.log($(link).text() + '\n ' + $(link).attr('href'));
			});

		});
	});
}); */



	var counter = 0;
	var url2 = 'http://www.s1homes.com/property-for-sale/forsale_search_results.cgi?type=House&newhomes=yes&sort=da&page=1';
	do {
		counter++;
		request(url2, {proxy: 'http://localhost:8888'}, function(err, resp, body) {
			console.log(url2)
			if (err)

				throw err;

			$ = cheerio.load(body);

			$('.nextButtonWrapper a:contains()').each(function() {

				//console.log ($(this).attr('href'));
				url2 = ('http://www.s1homes.com' + $(this).attr('href'));
			
				//console.log(url2);
				/*
					request(url, function(err, resp, body) {

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
							//console.log ('Image:' +$('.ad-thumbs ul').html());
							//console.log ('Image2:' + $('.ad-thumbs ul').attr('img src','href'));
							//console.log ('Image3:' + $('.ad-thumbs ul').html($("<img src>").attr("href")));

							links = $('.ad-thumbs a');
							$(links).each(function (i,link) {
								console.log($(link).text() + '\n ' + $(link).attr('href'));
							});

						});
					});
				}); */

			});
		});
	}
	while (counter < 4);




















/*
request(url, function(err, resp, body) {

	if (err)

		throw err;

	$ = cheerio.load(body);


	$('.pager a:contains()').each(function() {
		url = ('http://www.haddenrankin.com/sell-with-us/properties-for-sale.aspx' + $(this).attr('href'));
		console.log (url);

		request(url, function(err, resp, body) {

		if (err)

			throw err;

			$ = cheerio.load(body);

			$('.property_small_image a:contains("full details")').each(function() {

				console.log ($(this).attr('href'));

				request ('http://www.haddenrankin.com/' + $(this).attr('href'), function(err,resp,body) {
					//looks for meta tag with property og:url and takes the url that is assigned to content and then prints it out 
					$ = cheerio.load(body);
					//scrapeid = $('meta[name="description"]').attr('content');
					//console.log ('ID:' + $('a[class="schedule_download"]').attr('href'));

					// console.log ('Address:' + $('#property_detail h3').text());
					// console.log ('rooms:' + $('#property_detail h4').text());
					// console.log ('Description:' + $('.main_decription').text());
					// console.log ('Schedule:' + $('a[class="schedule_download"]').attr('href'));
					json = {
						'Address': $('#property_detail h3').text(),
						'Rooms': $('#property_detail h4').text(),
						'Description': $('.main_decription').text(),
						'Schedule': $('a[class="schedule_download"]').attr('href')
				}
					console.log(JSON.stringify(json));
					file_put_contents("hadden.json");
					//console.log ('Schedule:' + $('#schedule_download li a:contains("href")').text());

				});
			});
		});
				
	});
}); */
