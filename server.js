const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const bodyParser = require('body-parser');
const app = express();



// ===========Body parser MIDDLEWARE===========
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// ===========Body parser MIDDLEWARE Ends===========

let url = 'https://www.flipkart.com/cosmic-byte-cb-gk-02-corona-wired-7-color-rgb-backlit-effects-anti-ghosting-usb-gaming-keyboard/p/itmeyefkgwpxsmgk';
// let url = 'https://www.flipkart.com/lenovo-legion-m200-wired-optical-gaming-mouse/p/itmffegkcch6a5pp';

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


// To remove the not returning part, try making the function async using async and await

let getStatus = (urlValue) => {
     request(urlValue,  (error,res, html)=>{
        const $ =  cheerio.load(html);
        let productName = $('._35KyD6');
        let rating = $('.hGSR34');
        let availability = $('._9-sL7L');
        let price = $('._3qQ9m1');
        // logStatus(productName, price, rating, availability);
       let details = {
            name : productName.text(),
            rating : rating.text(),
            availability : availability.text(),
            price : price.text()
        };
        
        logStatus(productName, price,rating,availability);
        // return details;
     
    })
}



// app.get('/', (req, res) => {
//     res.send('Hello');
// })
// app.post('/product', (req, res) => {
//     let url = req.body.url;
//     console.log(req.body);
//     let details = getStatus(url);
//     res.json(details);
// })





let val = getStatus(url);
console.log(getStatus(url));
console.log(val, typeof val);



app.listen(8080,()=>console.log('Server Running @ PORT 3000!!'));




