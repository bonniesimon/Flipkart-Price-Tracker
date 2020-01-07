const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();



// ===========Body parser MIDDLEWARE===========
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// ===========Body parser MIDDLEWARE Ends===========

// let url = 'https://www.flipkart.com/cosmic-byte-cb-gk-02-corona-wired-7-color-rgb-backlit-effects-anti-ghosting-usb-gaming-keyboard/p/itmeyefkgwpxsmgk';
// let url = 'https://www.flipkart.com/lenovo-legion-m200-wired-optical-gaming-mouse/p/itmffegkcch6a5pp';
let url = 'https://www.flipkart.com/flipkart-smartbuy-mp406-mousepad/p/itm832563ec25943?pid=ACCFJZGXK8PWGHS8&lid=LSTACCFJZGXK8PWGHS8ZCQYYC&marketplace=FLIPKART&srno=b_1_35&otracker=hp_reco_Discounts%2Bfor%2BYou_2_7.dealCard.OMU_cid%3AS_F_N_4rr_km5_r39__d_50-100__NONE_ALL%3Bnid%3A4rr_km5_r39_%3Bmp%3AF%3Bct%3Ad%3B_5&otracker1=hp_reco_WHITELISTED_personalisedRecommendation%2Fdiscount_Discounts%2Bfor%2BYou_DESKTOP_HORIZONTAL_dealCard_cc_2_NA_view-all_5&fm=personalisedRecommendation%2Fdiscount&iid=81d62083-cd8e-4a77-a4f6-2ec46ae38ea0.ACCFJZGXK8PWGHS8.SEARCH&ppt=browse&ppn=browse&ssid=hqhen19dgiggamf41578390709805';

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



// let getStatus = (urlValue) => {
//      request(urlValue, (error,res, html)=>{
//         const $ = cheerio.load(html);
//         let productName = $('._35KyD6');
//         let rating = $('.hGSR34');
//         let availability = $('._9-sL7L');
//         let price = $('._3qQ9m1');
//        let details = {
//             name : productName.text(),
//             rating : rating.text(),
//             availability : availability.text(),
//             price : price.text()
//         };
        
//         // logStatus(productName, price,rating,availability);
//         return details;
     
//     })
// }



const getStatus = async (urlValue) => {
    try{
        const response = await axios.get(urlValue);
        const $ =await cheerio.load(response.data);
        let productName = $('._35KyD6');
        let rating = $('.hGSR34');
        let availability = $('._9-sL7L');
        let price = $('._3qQ9m1');
        // logStatus(productName, price,rating,availability);
        let availabilityStatus
        if(availability.text() == ''){
            availabilityStatus =  'Available!!';
        }else{
            availabilityStatus = availability.text();
        }
        let details = {
            name : productName.text(),
            rating : rating.text().slice(0,4),
            availability : availabilityStatus,
            price : price.text()
        };
        return new Promise((resolve, reject) => {
            resolve(details);
        });
    }
    catch(err){
        console.log(err);
    }
}



let val = getStatus(url);
val.then(result => console.log(result));





app.listen(8080,()=>console.log('Server Running @ PORT 3000!!'));




