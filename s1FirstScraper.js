	
    var request = require('request'); // lets you connect to web pages

	var cheerio = require('cheerio'); // cheerio mimics the DOM and jQuery/CSS style selectors





	

			request(url, /*{proxy: 'http://localhost:8888'},*/ function(err, resp, body) {

				if (err)

					throw err;

				$ = cheerio.load(body);

				$('.imgPlaceholder a:contains()').each(function() {

					//console.log ('http://www.s1homes.com/' + $(this).attr('href'));

					url2 ='http://www.s1homes.com/' + $(this).attr('href');

					
				});
			}); 

			connection.queue('hello', {'durable': false}, function (q){
				connection.publish('hello', url2);
	    		console.log(" [x] Sent 'url!'");
			});
		};	



    	amqp_hacks.safeEndConnection(connection);
	});

