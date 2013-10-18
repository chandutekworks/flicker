var feedparser = require('feedparser'),
	cradle = require('cradle'),
	http = require('http'),
	cheerio=require("cheerio");
var newsUrl =  'http://api.flickr.com/services/feeds/photos_public.gne';
var newsDBName = 'flickr';
var dbutil = require('./dbutil');

//getting the all the images from the database

exports.listNews = function(customer,cb){	
	var db = dbutil.getconnection().database(newsDBName);
	db.view('flickr/images',function(err,res){		
		if(res && res.length > 0){
			cb(err,res);			
		}else if(err){
			console.log('Error in listNews');
			console.log(err);			
		}else{
			cb(err,false);
		}
	});
};

// for savingg the all the images with all details

function saveNews(articles){
	http.get(articles.link, function(res) {
		var htmlcontent='';
		res.on("data", function(chunk) {
			htmlcontent= htmlcontent+chunk;
		});
		res.on('end',function(){     
			$=cheerio.load(htmlcontent);					
			var img_src= $('#main-photo-container img').attr('src');			
			articles.img_src  = img_src;				
			var db = dbutil.getconnection().database(newsDBName);
			db.save(articles,function(err,result){
				console.log('saved the item ');				
			});
		});
	});		
}

// connecting to the rss feed and fetching the data

/*function updateImages(){
	var parser = new feedparser();
	parser.parseUrl(newsUrl,function(err,meta,articles){				
		var db = dbutil.getconnection().database(newsDBName);
		for(var i = 0;i < articles.length ;i++){
			var item = {};
			item.name = articles[i].name;
			item.link = articles[i].link;
			item.title = articles[i].title;
			item.author = articles[i].author;
			saveNewss(item);
		}
	});// parse url
};

updateImages();*/
