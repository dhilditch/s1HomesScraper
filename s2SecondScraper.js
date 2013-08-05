	var request = require('request'); // lets you connect to web pages

	var cheerio = require('cheerio'); // cheerio mimics the DOM and jQuery/CSS style selectors

	var amqp = require('amqp');	//used for messaging


	function sub() {
  		var exchange = conn.exchange(''); // get the default exchange
  		var queue = conn.queue('estate', {}, function() { // create a queue	
  			queue.subscribe(function(msg) { // subscribe to that queue
	      		//console.log(msg.body); // print new messages to the console
	      		url3 = (msg.body)
	      		//console.log(url3)

				request (url3, function(err,resp,body) {
					console.log(url3)
					$ = cheerio.load(body);
					
					console.log ('Address:' + $('.detailsKeyPropertyDetails h1').text());
					console.log ('Rooms:' + $('.detailsKeyPropertyDetails h2').text());
					console.log ('Description:' + $('.detailsDescription').text());
					console.log ('Schedule:' + $('#but1 a:contains()').attr('href'));
					console.log('Estate Agent: ' + $('.request_details_agent_name strong:contains()').text());
					console.log('Images:');
					links = $('.ad-thumbs a');
					$(links).each(function (i,link) {
						console.log($(link).text() + '\n ' + $(link).attr('href'));
					});
				});
  			});
  		});
	}


	var url = process.env.CLOUDAMQP_URL || "amqp://gnmehswn:IlbEqsWPcK3tYO6S_lIJexWu4TxWMtce@bunny.cloudamqp.com/gnmehswn"; // default to localhost
	var implOpts = {
	  reconnect: true,
	  reconnectBackoffStrategy: 'linear', // or 'exponential'
	  reconnectBackoffTime: 500, // ms
	};
	var conn = amqp.createConnection({ url: url }, implOpts); // create the connection
	conn.on('ready', sub); // when connected, call "pub_and_sub"

/*
function sub() {
  var exchange = conn.exchange(''); // get the default exchange
  var queue = conn.queue('test', {}, function() { // create a queue
    
    queue.subscribe(function(msg) { // subscribe to that queue
      console.log("subscribe" + msg.body); // print new messages to the console
    });
    
  });
}

var url = process.env.CLOUDAMQP_URL || "amqp://gnmehswn:IlbEqsWPcK3tYO6S_lIJexWu4TxWMtce@bunny.cloudamqp.com/gnmehswn"; // default to localhost
var implOpts = {
  reconnect: true,
  reconnectBackoffStrategy: 'linear', // or 'exponential'
  reconnectBackoffTime: 500, // ms
};
var conn = amqp.createConnection({ url: url }, implOpts); // create the connection
conn.on('ready', sub); // when connected, call "pub_and_sub"
*/
