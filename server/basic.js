var express = require('express');
var partials = require('express-partials');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var unirest = require('unirest');
var fs = require('fs');
var OperationHelper = require('apac').OperationHelper;
var google = require('google');

var app = express();

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}))
app.use(morgan('dev'));
app.use(express.static(__dirname + '/../client'));



var base64_decode = function(base64str, file) {
  var bitmap = new Buffer(base64str, 'base64');
  fs.writeFileSync(file, bitmap);
  console.log('******** File created from base64 encoded string ********');
};

var postImage = function(req, res) {
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
    var token = result.body.token;
    console.log('image has been posted and here is the token ', token)
    getName(req, res, token);
  });
};

var getName = function(req, res, token) {
  var baseurl = "https://camfind.p.mashape.com/image_responses/"
  var geturl = baseurl.concat(token);
  unirest.get(geturl)
  .header("X-Mashape-Key", "skG4sxWdqlmshwek4d002jlqlFXrp16ucoQjsng5Liv2LR1Cms")
  .header("Accept", "application/json")
  .end(function (result) {
    var status = result.body.status;
    if (status === "not completed") {
      console.log('waiting for response...')
      return getName(req,res,token)
    }
    var name = result.body.name;
    console.log('this is the name ', name);
    var category = req.body.category.toLowerCase();
    console.log(category)
    if (category === 'amazon') {
      getAmazonUrl(req, res, name);
    } else {
      googling(req, res, name);
    }
    return;
  });
};


var opHelper = new OperationHelper({
    awsId:     'AKIAIMHH626LYHUYU54Q',
    awsSecret: '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',
    assocId:   'csreyescom-20'
});

var getAmazonUrl = function(req, res, name) {
  opHelper.execute('ItemSearch', {
      'SearchIndex': 'All',
      'Keywords': name,
      'ResponseGroup': 'ItemAttributes,Offers'
  }, function(error, results) {
      if (error) { 
        console.log('Error: ' + error + "\n"); 
        res.status(404).send(error);
      }
      var itemUrl = results.ItemSearchResponse.Items[0].Item[0].DetailPageURL[0]
      res.status(200).send(JSON.stringify(itemUrl));
  });
}

var googling = function(req, res, name) {
  var category = req.body.category;
  if (category == 'nutrition') {
    var searchString = 'fatsecret foods ' + name;
  } else if (category) {
    var searchString = category + ' ' + name;
  } else {
    var searchString = name
  }
  google(searchString, function(err, next, links){
    if (err) console.error(err);
    firstLink = links[0].link
    res.status(200).send(JSON.stringify(firstLink));
  })
}

app.post('/post', function(req,res) {

  // var base64str = req.body.base64;
  // base64_decode(base64str, 'test.png')
  // postImage(req,res)

  // getName(req,res,'kCY_H7FMip7kMdJ84X6DbQ')

  // return getName(req,res,"gSLFG7WvYug_hv4Fb7eg1w")
  res.status(200).send(); //delete when done with FRONTEND;
})







module.exports = app;