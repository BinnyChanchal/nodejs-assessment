var express = require('express');
var path = require('path');
var http = require('http');
var request = require('request');
var querystring = require('querystring');

var app = express()

app.set('view engine', 'pug');
app.set('views', './views');

app.use('/assets', express.static(__dirname + '/assets'));


app.get('/', function (req, res) {
	res.render('product_list_page');
});

app.get('/products', function (req, res) {
	request('http://m.lowes.com/CatalogServices/product/nvalue/v1_0?nValue=4294857975&maxResults=6&showURL=1&rollUpVariants=1&showUrl=true&storeNumber=0595&priceFlag=rangeBalance&showMarketingBullets=1', function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	      // from within the callback, write data to response, essentially returning it.
	      var response = JSON.parse(body);
	      res.json(response.productList);
	    }
  	});
});

app.get('*', function (req, res) {
    res.status(404).send('Not found');
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})