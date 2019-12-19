const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app = express();

// let url = 'https://www.flipkart.com/cosmic-byte-cb-gk-02-corona-wired-7-color-rgb-backlit-effects-anti-ghosting-usb-gaming-keyboard/p/itmeyefkgwpxsmgk';
let url = 'https://www.flipkart.com/lenovo-legion-m200-wired-optical-gaming-mouse/p/itmffegkcch6a5pp';


request(url, (error,res, html)=>{
   const $ = cheerio.load(html);
   let availability = $('._9-sL7L');
   let price = $('._3qQ9m1').text();
   console.log(price);
   if(availability.text() == ''){
       console.log('Item available!!');
   }else{
       console.log(availability.text());
   }

//    console.log(typeof price);
   console.log('after logging price');
})





app.listen(3000,()=>console.log('Server Running!!'));