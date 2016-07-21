var bodyParser = require('body-parser');
var path = require('path');
var friendData = require('../data/friends.js')

module.exports = function(app) {
	app.get("/api/friends", function(req,res) {
		res.json(friendData);
	})
	app.post("/api/friends", function (req, res){
		var lastDiff = 50;
		var bestMatch;
		friendData.forEach(function(item) {
			var diff = 0;
			for(i=0;i<item.scores.length;i++) {
				diff += Math.abs(item.scores[i] - req.body.scores[i]);
			}
			if (diff <= lastDiff) {
				lastDiff = diff;
				bestMatch = item;
			}
		})
		console.log(bestMatch);
		res.json(bestMatch);
		friendData.push(req.body);
	})
}