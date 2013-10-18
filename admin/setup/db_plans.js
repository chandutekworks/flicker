var cradle = require("cradle");
var cc = new (cradle.Connection)('http://localhost', 5984);

console.log('Creating Payment Plans');
var paypackages = cc.database('paypackages');
paypackages.create(function(err, res) {
	if (err) {
		console.log(err.error + ":" + err.reason);
	} else if (res && res.ok) {
		console.log("Database Created");
	}
	paypackages.save('_design/chinmaya', {
		packages : {
			map : function(doc) {
				if (doc.customer && doc.customer == 'chinmaya') {
					emit(doc._id, doc);
				}
			}
		}
	}, function(err, res) {
		if (err) {
			console.log(err.error + ":" + err.reason);
		} else if (res && res.ok) {
			console.log("Design created/updated");
		}
	});
});


console.log('Creating Payment Plans');
var pgRequests = cc.database('pg_requests');
pgRequests.create(function(err, res) {
	if (err) {
		console.log(err.error + ":" + err.reason);
	} else if (res && res.ok) {
		console.log("Database Created");
	}
	pgRequests.save('_design/chinmaya', {
		pgRequests : {
			map : function(doc) {
				if (doc.customer && doc.customer == 'chinmaya') {
					emit(doc._id, doc);
				}
			}
		}
	}, function(err, res) {
		if (err) {
			console.log(err.error + ":" + err.reason);
		} else if (res && res.ok) {
			console.log("Design created/updated");
		}
	});
});
