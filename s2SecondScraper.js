	var request = require('request'); // lets you connect to web pages

	var cheerio = require('cheerio'); // cheerio mimics the DOM and jQuery/CSS style selectors

	var amqp = require('amqp');	//used for messaging

	var mongoose = require('mongoose');//used for mongoose

	var db = mongoose.connection; //used for mongoose

	db.on('error', console.error);
	db.once('open', function() {
		var propertySchema = new mongoose.Schema({
		  	address: String,
			desc: String,
			Schedule: String,
			EstateAgent: String,
			Images: Array()
		});
		var Property = mongoose.model('Property', propertySchema);

		//connect to rabiit messaging
		var url = process.env.CLOUDAMQP_URL || "amqp://gnmehswn:IlbEqsWPcK3tYO6S_lIJexWu4TxWMtce@bunny.cloudamqp.com/gnmehswn"; // default to localhost
		var implOpts = {
		  reconnect: true,
		  reconnectBackoffStrategy: 'linear', // or 'exponential'
		  reconnectBackoffTime: 500, // ms
		};
		var conn = amqp.createConnection({ url: url }, implOpts); // create the connection
		conn.on('ready', sub); // when connected, call "sub"

		function sub() {
	  		var exchange = conn.exchange(''); // get the default exchange
	  		var queue = conn.queue('mongo', {}, function() { // create a queue	
	  			queue.subscribe(function(msg) { // subscribe to that queue
		      		//console.log(msg.body); // print new messages to the console
		      		url3 = (msg.body)
		      		//console.log(url3)

					request (url3, function(err,resp,body) {
						console.log(url3)
						$ = cheerio.load(body);
						/*var h = ('Address:' + $('.detailsKeyPropertyDetails h1').text())
						h = h.replace(/\s+/g,' ');
						console.log(h);*/
						/*console.log ('Rooms:' + $('.detailsKeyPropertyDetails h2').text());
						console.log ('Description:' + $('.detailsDescription').text());
						console.log ('Schedule:' + $('#but1 a:contains()').attr('href'));
						console.log('Estate Agent: ' + $('.request_details_agent_name strong:contains()').text());
						console.log('Images:');
						links = $('.ad-thumbs a');
						$(links).each(function (i,link) {
							console.log($(link).text() + '\n ' + $(link).attr('href'));
						});
						*/
						/*
						var images = new Array(); 
						$(links).each(function (i,link) {
								images = ($(link).text() + '\n ' + $(link).attr('href'));
								console.log(images);
						})
						*/

						// Compile a 'Property' model using the propertySchema as the structure.
						// Mongoose also creates a MongoDB collection called 'Property' for these documents.
						
						var house = new Property({
							address: ($('.detailsKeyPropertyDetails h1').text()).replace(/\s+/g,' '),// trim(($('.detailsKeyPropertyDetails h1').text())),
							desc: ($('.detailsDescription').text()).replace(/\s+/g,' ').replace(/'\'/,''),
							Schedule: ($('#but1 a:contains()').attr('href')),  
							EstateAgent:  ($('.request_details_agent_name strong:contains()').text())
							//images:
						});
						//saves the record 
						house.save(function(err, house) {
							if (err) return console.error(err);
							console.log(house); //prints the whole of the variable 
						});
					});
	  			});
	  		});
		}
	});

	

	mongoose.connect('mongodb://property:pr0p3rty@dharma.mongohq.com:10016/property'); //connection for mongoose db


