const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app = express();

// let url = 'https://www.flipkart.com/cosmic-byte-cb-gk-02-corona-wired-7-color-rgb-backlit-effects-anti-ghosting-usb-gaming-keyboard/p/itmeyefkgwpxsmgk';
let url = 'https://www.flipkart.com/lenovo-legion-m200-wired-optical-gaming-mouse/p/itmffegkcch6a5pp';

const logStatus = (name, price, rating, availability) => {
    console.log('Name : ',name.text());
    console.log('Price : ',price.text());
    console.log('Rating : ',rating.text().slice(0,4));
    if(availability.text() == ''){
        console.log('Availability : Available!!🤩');
    }else{
        console.log('Availability : ',availability.text(),'😌');
    }
}

const getStatus = (urlValue) => {
    request(urlValue, (error,res, html)=>{
        const $ = cheerio.load(html);
        let productName = $('._35KyD6');
        let rating = $('.hGSR34');
        let availability = $('._9-sL7L');
        let price = $('._3qQ9m1');
        logStatus(productName, price, rating, availability);
     
    })
}


getStatus(url);







app.listen(3000,()=>console.log('Server Running!!'));