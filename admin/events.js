var feedparser = require('feedparser'),
    http = require('http'),    
    cheerio=require("cheerio");
 var dbutil = require('./dbutil');
var eventsUrl =  'http://www.chinmayamission.com/rss-events.php';
var eventsDBName = 'events';

var updateEvents = function(customer,cb){
  getFeed(eventsUrl,eventsDBName,customer,function(err){
		cb();
	});

};

var saveFeed = function(dbName, entries,cb){
 	var db = dbutil.getconnection().database(eventsDBName);
	db.save(entries,function(err,result){
		cb(err);	
	});
};

var getFeedEvents=function(id,customer,cb){
    var db = dbutil.getconnection().database(eventsDBName);
    db.get(id,function(err,results){
    	 if(err){
			console.log('Error in getFeedEvents');
			console.log(err);
			cb(err,results);
		 }else
        	 cb(err,results);	
    });
};	

var listEvents = function(customer,cb){
  var db = dbutil.getconnection().database(eventsDBName);
  db.view(customer+'/eventsList',{ascending: true},function(err,res){
		cb(err,res);
	});	
};


var getLink = function(dbName,date,customer,cb){
	var db = dbutil.getconnection().database(dbName);
	db.view(customer+'/byTitle',{key:date},function(err,doc){	
		if(doc)
			cb(doc[0]?true:false);
		else
			cb(false);	
	});
};

var getFeed = function(url,dbName,customer,cb){
	var parser = new feedparser();
	var db = dbutil.getconnection().database(dbName);
	db.view(customer+'/byPubDate',function(err,doc){	
		for(var i = 0; i < doc.length; i++) {
			db.remove(doc[i].id, doc[i].value._rev, function(err, doc) {
	      if(err)
	        console.log('Error occured in deleting news');
	    });
	  }     
	});
	parser.parseUrl(url,function(err,meta,articles){
	  console.log('begining of paser.parseURL');
	  console.log(articles.length);
		if(err){
			console.log('Fatal error in parseurl :'+err);
		}else{
			var i=0;
			var feedcb=function(err){
			if(err){
		    console.log('fatal:'+err);
	    }else{
				if(articles.length==i){
				  cb();
					return;
				}
				var article=articles[i];
				i++;
        http.get(article.link, function(res) {
          var htmlcontent='';
          res.on("data", function(chunk) {
          htmlcontent= htmlcontent+chunk;
        });									
        res.on('end',function(){     
           $=cheerio.load(htmlcontent);
          var heading1=$('td.event_table_heading').eq(1).text(); 												                           
          var event_Type2=$('td.event_text').eq(15).text();												                            
          var event_Category2=$('td.event_text').eq(18).text();												                            
          var event_Description2=$('td.event_text').eq(21).text();												                            
          var start_Date2=$('td.event_text').eq(24).text();												                            
          var end_Date2=$('td.event_text').eq(27).text();																              
          var event_Time2=$('td.event_text').eq(30).text();														                      
          var event_Venue2=$('td.event_text').eq(33).html();														                     
          var City2=$('td.event_text').eq(36).text();														                      
          var State2=$('td.event_text').eq(38).text();														                      
          var Country2=$('td.event_text').eq(41).text();														                      
          var Charges2=$('td.event_text').eq(44).text();														                      
          var Contact_Details2=$('td.event_text').eq(47).html();														                     
          var Facilitators2=$('td.event_text').eq(50).text();
					var item = {};
					item.title = article.title;
					item.pubDate = article.pubDate;
					item.createDate = article.pubDate;
					item.description = article.description.replace(/<(?:.|\n)*?>/gm, '');
					item.link = article.link;
					item.guid = article.guid;
					item.customer=customer;
					var content={};
					content.heading1=heading1;
					content.event_Type=event_Type2;																																								
					content.event_Category=event_Category2;																				
					content.event_Description=event_Description2;																				
					content.start_Date=start_Date2;																				
					content.end_Date=end_Date2;																																								
					content.event_Time=event_Time2;																				
					content.event_Venue=event_Venue2;																				
					content.city=City2;																				
					content.state=State2;																				
					content.country=Country2;																				
					content.charges=Charges2;																				
					content.contact_Details=Contact_Details2;																				
					content.facilitators=Facilitators2;
					item.content=content;
					item.type='events';
          item.subscription='Free';
					saveFeed(dbName,[item],feedcb);
				}); //else part of http.get()
			}).on('error', function(e) {
				console.log("Got error: " + e.message);
			});// http.get()
		}//else part of feedcb
  }; //feedcb() ending
  feedcb(false);
					
		} //esle part of parse url
	});// parse url
};// get feed

exports.updateEvents = updateEvents;
exports.listEvents = listEvents;
exports.getFeedEvents=getFeedEvents;
