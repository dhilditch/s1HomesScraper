	
    var request = require('request'); // lets you connect to web pages

	var cheerio = require('cheerio'); // cheerio mimics the DOM and jQuery/CSS style selectors

	var amqp = require('amqp');	//used for messaging



	for (counter=1;counter<3;counter++) {
		var url = 'http://www.s1homes.com/property-for-sale/forsale_search_results.cgi?type=House&newhomes=yes&sort=da&page=' +counter;

		request(url, {proxy: 'http://localhost:8888'}, function(err, resp, body) {

			if (err)

				throw err;

			$ = cheerio.load(body);

			$('.imgPlaceholder a:contains()').each(function() {

				console.log ('http://www.s1homes.com/' + $(this).attr('href'));

				var url2 = 'http://www.s1homes.com/' + $(this).attr('href');
				console.log (url2)

				
			});
		}); 
	}


/*
function pub() {
  var exchange = conn.exchange(''); // get the default exchange
  var queue = conn.queue('urls', {}, function() { // create a queue
    
    // publish a message
    exchange.publish(queue.name, {body: 'Hello CloudAMQP!'});
    console.log("published");
  });
}

var url = process.env.CLOUDAMQP_URL || "amqp://gnmehswn:IlbEqsWPcK3tYO6S_lIJexWu4TxWMtce@bunny.cloudamqp.com/gnmehswn"; // default to localhost
var implOpts = {
  reconnect: true,
  reconnectBackoffStrategy: 'linear', // or 'exponential'
  reconnectBackoffTime: 500, // ms
};
var conn = amqp.createConnection({ url: url }, implOpts); // create the connection
conn.on('ready', pub); // when connected, call "pub_and_sub"

*/