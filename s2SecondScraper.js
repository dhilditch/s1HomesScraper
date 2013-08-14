	var request = require('request'); // lets you connect to web pages

	var cheerio = require('cheerio'); // cheerio mimics the DOM and jQuery/CSS style selectors

	var amqp = require('amqp');	//used for messaging

	var mongoose = require('mongoose');//used for mongoose

	var db = mongoose.connection; //used for mongoose

	var geonoder = require('geonoder'); //used for geocoding

	db.on('error', console.error);
	db.once('open', function() {

		var housesSchema = new mongoose.Schema({
		  	address: String,
		  	latitude: Number,
		  	longitude: Number,
		  	rooms: String,
		  	price: String,
			desc: String,
			Schedule: String,
			EstateAgent: String,
			imageLinks: Array(),
			loc: {type: [Number], index: '2d'},
			saleID: String,
			addedOn: String 
		});

		var Property = mongoose.model('Property', housesSchema);

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
						//console.log(url3)
						$ = cheerio.load(body);

						var address = $('.detailsKeyPropertyDetails h1').text().replace(/\s+/g,' ');
						var rooms = $('.detailPropertyType').text().replace(/\s+/g,' ');
						var price = $('.detailPropertyPrice').text().replace(/\s+/g,' ');
						var description = $('.detailsDescription').text().replace(/\s+/g,' ').replace(/'\'/,'');
						var schedule = 'http://www.s1homes.com' + $('#but1 a:contains()').attr('href');
						var estate = $('.request_details_agent_name strong:contains()').text();
						var addOn = $('#keyFactTime span strong').text();

						var imageLinksTemp=new Array(); 
						links = $('.ad-thumbs a');
						$(links).each(function (i,link) {
							imageLinksTemp[i] =($(link).text() + '\n ' + $(link).attr('href')).trim();
							//console.log('imageLinks[' + i + ']' + imageLinks[i]);
						}); 

						geonoder.toCoordinates(address, geonoder.providers.google, function(lat, long){
								//console.log('Lat: ' + lat + ' Long: ' + long + 'address: ' + address)  
				   				var lattitude = lat;
				   				var longtitude = long;
				   				save(lattitude, longtitude);
				   				
			   			});


			   			function save(lattitude, longtitude) {

				   			var house = new Property({
								address: (address),
								latitude:(lattitude),
								longitude:(longtitude),
								rooms: (rooms),
								price: (price),
								desc: (description),
								Schedule: (schedule),  
								EstateAgent:  (estate),
								imageLinks: imageLinksTemp,
								loc: [(longtitude),(lattitude)],
								saleID: 'For Sale',
								addedOn: addOn
							});
							
							//saves the record 
							house.save(function(err, house) {
								if (err) return console.error(err);
								console.log(house); //prints the whole of the variable 
							});
						};
					});
	  			});
	  		});
		}
	});

	
	mongoose.connect('mongodb://property:pr0p3rty@dharma.mongohq.com:10016/property'); //connection for mongoose db


