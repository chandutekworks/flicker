var cradle = require('cradle');

exports.getconnection = function() {
	//var db = new (cradle.Connection)('http://www.tekworksinfo.com', 5984, {auth:{ username: 'admin', password: 't#kw)rksc)uch' }});
  var db = new (cradle.Connection)('http://www.tekworksinfo.com', 5985, {auth:{ username: 'admin', password: 'adminadmin' }});
	//var db = new (cradle.Connection)();
	return db;
};

exports.getconnection1 = function() {
	//var db = new (cradle.Connection)('http://www.tekworksinfo.com', 5984, {auth:{ username: 'admin', password: 't#kw)rksc)uch' }});
	//var db = new (cradle.Connection)('http://www.tekworksinfo.com', 5985, {auth:{ username: 'admin', password: 'adminadmin' }});
	var db = new (cradle.Connection)();
	return db;   	
};