// Include express lib
var express = require('express');
// express get a router
var router = express.Router();
// We want db
var mongodb = require('mongodb');
// db client
var client = mongodb.MongoClient;

// This will be the db url
var uri = "mongodb://mongo/dummy-app";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// url http://xxx.com/data/from/db
router.get('/data/from/db', function(req, res, next) {
	// db lient connect to mongo dummy app
	client.connect(uri, function (err, db) {
		// if error, return next with error
		if (err) return next(err);

		// No error, get dummy table
    var collection = db.collection('dummy');

		// We get all data based on {}
		// Convert to array
    collection.find({}).toArray(function(err, docs) {
			// If error, return next with error	
			if (err) return next(err);

			// res print docs
			// we return here....
			return res.json(docs);
    });			
	});
});


// Do a post
// url is /data/into/db
// req, result, next
router.post('/data/into/db', function(req, res, next) {
	// connect to db with url
	client.connect(uri, function (err, db) {
		// Error
		if (err) return next(err);

		// Get table
    var collection = db.collection('dummy');
  
		// We have table then we insert many
		// req.body, multiple docs...  
		// insertMany
		collection.insertMany(req.body, function(err, result) {
			// res json, success
			return res.json({ result: "success" });
   	});
	});
});


// Export router
module.exports = router;
