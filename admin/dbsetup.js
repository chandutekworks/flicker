var cradle = require("cradle");
console.log("Calling the connection");
var cc = new (cradle.Connection)('http://www.tekworksinfo.com', 5984, {auth:{ username: 'admin', password: 't#kw)rksc)uch' }});

var CryptoJS=require('./crypto');

var twc = cc.database('twc');
  // for news 
		twc.save('_design/chinmaya', {			
// for gallery
		gallery_byExpiryDate : {
					map : function(doc) {
						if (doc.customer && doc.customer == 'chinmaya' && doc.expiryDate && doc.type=='gallery') {
							emit(doc.subscription, doc);
						}
					}
				},		
 		    	    
 // for prayers		    
		    prayers_bySloka: {
		        map: function (doc) {        	
		            if (doc.customer && doc.customer== 'chinmaya' && doc.type=='prayers'){            	
		            	emit( doc.sloka,doc);
		            } 
		            	
		        }
		    },
// for audio
         	audio_byExpiryDate:{
				map: function(doc){
					if(doc.customer && doc.customer=='chinmaya' && doc.type=='audio'){
						emit(doc.subscription,doc);
					}
						
				}
			},
			audio_byType:{
				map: function(doc){
					if(doc.customer && doc.customer=='chinmaya' && doc.type=='audio'){
						emit(doc.subscription,doc);
					}
						
				}
			},
			audio_byFilename:{
				map: function(doc){
					if(doc.customer && doc.customer=='chinmaya' && doc.OriginalfileName && doc.type=='audio'){
						emit(doc.OriginalfileName,doc);
					}
						
				}
			},
// for kids			
			kids_byExpiryDate:{
				map: function(doc){
					if(doc.customer && doc.customer=='chinmaya' && doc.type=='kids'){
						emit(doc.subscription,doc);
					}
						
				}
			},
			kids_byType:{
				map: function(doc){
					if(doc.customer && doc.customer=='chinmaya' && doc.type=='kids'){
						emit(doc.subscription,doc);
					}
						
				}
			},
			kids_byFilename:{
				map: function(doc){
					if(doc.customer && doc.customer=='chinmaya' && doc.OriginalfileName && doc.type=='kids'){
						emit(doc.OriginalfileName,doc);
					}
						
				}
			},
// for chykvideo
         	chykvideo_byExpiryDate:{
				map: function(doc){
					if(doc.customer && doc.customer=='chinmaya' && doc.type=='chykvideo'){
						emit(doc.subscription,doc);
					}
						
				}
			},
			chykvideo_byType:{
				map: function(doc){
					if(doc.customer && doc.customer=='chinmaya' && doc.type=='chykvideo'){
						emit(doc.subscription,doc);
					}
						
				}
			},
			chykvideo_byFilename:{
				map: function(doc){
					if(doc.customer && doc.customer=='chinmaya' && doc.OriginalfileName && doc.type=='chykvideo'){
						emit(doc.OriginalfileName,doc);
					}
						
				}
			},
// for zenyasi
    	zenyasi_byExpiryDate : {
			map : function(doc) {
				if (doc.customer && doc.customer == 'chinmaya' && doc.expiryDate && doc.type=='zenyasi') {
					emit(doc.subscription,doc);
				}

			}
		},
// for thinktoons		
		thinktoons_byExpiryDate : {
			map : function(doc) {
				if (doc.customer && doc.customer == 'chinmaya' && doc.expiryDate && doc.type=='thinktoons') {
					emit(doc.subscription,doc);
				}

			}
		},
// for askguruji
		askguruji_all:{
		map: function(doc){
			if(doc.customer && doc.customer=='chinmaya' && doc.question && doc.type=='askguruji') {
					emit(doc.subscription,doc);				
			}				
		}
	}	
	        							
});

