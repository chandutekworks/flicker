var news = require('../flickrmodel');

exports.homepage = function(req,res){
	res.sendfile('static/admin/news.html');
};

exports.list=function(req,res){	 
	news.listNews(req.body.customer,function(err,results){ 	 	 	 		
		res.send(results);		
	});	
}; 
 
exports.updateNews=function(req,res){ 
	news.updateNews(req.body.customer,function(){	
	    
  });	
  res.send(true);
};
 


exports.FeedDetails=function(req,res){ 	
	news.getFeedNews(req.body.id,function(err,results){
		res.send(results);			
	});
};
 

