	
    var request = require('request'); // lets you connect to web pages

	var cheerio = require('cheerio'); // cheerio mimics the DOM and jQuery/CSS style selectors

	var amqp = require('amqp');	//used for messaging

	var initalUrl = 'http://www.s1homes.com/property-for-sale/forsale_search_results.cgi?type=House&newhomes=yes&sort=da&page=1'
	var m;	
	//get number of properties for sale
	request(initalUrl, function(err, resp, body) {

		if (err)

		throw err;

		$ = cheerio.load(body);
		var n = ($('.textPositive').text());				
		parseInt(n);	

		m = Math.ceil(n/10)	//get number of pages
		//console.log(m)
		run();
	});

	function run(){
		var url = process.env.CLOUDAMQP_URL || "amqp://gnmehswn:IlbEqsWPcK3tYO6S_lIJexWu4TxWMtce@bunny.cloudamqp.com/gnmehswn"; //connect to host
		var implOpts = {
			reconnect: true,
			reconnectBackoffStrategy: 'linear', // or 'exponential'
			reconnectBackoffTime: 500, // ms
		};
		var conn = amqp.createConnection({ url: url }, implOpts); // create the connection
		conn.on('ready', pub); // when connected, call "pub"


		function pub() {
			var exchange = conn.exchange(''); // get the default exchange
	  		var queue = conn.queue('estate', {}, function() { // create a queue		

				for (counter=1;counter<m;counter++) {
					var url = 'http://www.s1homes.com/property-for-sale/forsale_search_results.cgi?type=House&newhomes=yes&sort=da&page=' +counter;
					
					request(url, function(err, resp, body) {

						if (err)

							throw err;

						$ = cheerio.load(body);

						$('.imgPlaceholder a:contains()').each(function() {

							//console.log ('http://www.s1homes.com/' + $(this).attr('href'));

							var url2 = 'http://www.s1homes.com/' + $(this).attr('href');
							//console.log (url2)

							exchange.publish(queue.name, {body: url2});	//publish message containing urls
		   					console.log("published");

							
						});
					}); 
				}
			});	
		};
	};



