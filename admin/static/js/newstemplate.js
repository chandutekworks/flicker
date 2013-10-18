var dust=require('dustjs-linkedin');

var corousel2 = 

"{#images}"+  
  "<li>"+
  "<div class='show_details'>"+    
   "<h4 style='color: purple;'>{value.author}</h4>"+
    "<div class='mov_img_rate'> "+
      "<a href='{value.link}' target='_blank'><img src=\"{value.img_src}\" alt='{value.title}' style='height:100%;width:100%;' ></a>"+      
    "</div>"+    
  "</div></li>"+ 
"{/images}";
var  corouselList2 = dust.compile(corousel2, "corouselTemplate2");
console.log(corouselList2);
