var express = require('express');
var partials = require('express-partials');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var unirest = require('unirest');
var fs = require('fs');
var OperationHelper = require('apac').OperationHelper;
var util = require('util');
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

var complete = false

var getting = function(req, res, token) {
	var baseurl = "https://camfind.p.mashape.com/image_responses/"
	var geturl = baseurl.concat(token);
	console.log(geturl);
	console.log(typeof geturl)
	unirest.get(geturl)
	.header("X-Mashape-Key", "skG4sxWdqlmshwek4d002jlqlFXrp16ucoQjsng5Liv2LR1Cms")
	.header("Accept", "application/json")
	.end(function (result) {
	  // console.log(result.status, result.headers, result.body);
	  var status = result.body.status;
	  if (status === "not completed") {
	  	return getting(req,res,token)
	  }
	  var name = result.body.name;
	  // name = JSON.stringify({name : name});
	  console.log('this is the status ', status);
	  console.log('this is the name ', name);
		// res.status(200).send(name);
		getListing(req, res, name)
		return;
	});
};

var opHelper = new OperationHelper({
    awsId:     '',
    awsSecret: '',
    assocId:   ''
});

var getListing = function(req, res, name) {
	opHelper.execute('ItemSearch', {
	    'SearchIndex': 'All',
	    'Keywords': name,
	    'ResponseGroup': 'ItemAttributes,Offers'
	}, function(error, results) {
	    if (error) { 
	    	console.log('Error: ' + error + "\n"); 
	    	res.status(404).send(error);
	    }
	    // console.log("Results:\n" + util.inspect(results) + "\n");
	    res.status(200).send(results)
	});
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
	  var token = result.body.token;
	  // res.send(200);
	  getting(req, res, token);
	  console.log('i still get executed !!!')
	});
};

app.post('/', function(req,res) {
	console.log(456545465);
	console.log(typeof req.body.base64)
	var base64str = req.body.base64;
	base64_decode(base64str, 'test.png')
	posting(req,res)
	// getting(req,res,"FXzbk8SgbT8x0FX0BpTCAQ");
	// getListing(req, res);
})


module.exports = app;