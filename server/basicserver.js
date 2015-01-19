var express = require('express');
var partials = require('express-partials');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var unirest = require('unirest');
var fs = require('fs');

var app = express();


app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}))
app.use(morgan('dev'));
app.use(express.static(__dirname + '/../client'));


function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
}


var posting = function(req, res) {
	unirest.post("https://camfind.p.mashape.com/image_requests")
	.header("X-Mashape-Key", "skG4sxWdqlmshwek4d002jlqlFXrp16ucoQjsng5Liv2LR1Cms")
	.field("focus[x]", "480")
	.field("focus[y]", "640")
	.field("image_request[altitude]", "27.912109375")
	.attach("image_request[image]", fs.createReadStream("test.png"))
	.field("image_request[language]", "en")
	.field("image_request[latitude]", "35.8714220766008")
	.field("image_request[locale]", "en_US")
	.field("image_request[longitude]", "14.3583203002251")
	// .field("image_request[remote_image_url]", "http://www.endlesssimmer.com/wp-content/uploads/2013/02/cantina_steak_burrito.jpg")
	.end(function (result) {
	  console.log('here is the body ', result.body);
	  console.log('here is the token ', result.body.token)
	  res.send(200);
	  console.log('i still get executed !!!')
	});
};

app.post('/', function(req,res) {
	console.log(456545465);
	console.log(typeof req.body.base64)
	var base64str = req.body.base64;
	base64_decode(base64str, 'test.png')
	posting(req,res)
})


module.exports = app;