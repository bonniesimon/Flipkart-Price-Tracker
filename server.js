const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const cron = require('node-cron');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const path = require('path');



// ===========Body parser MIDDLEWARE===========
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// ===========Body parser MIDDLEWARE Ends===========

// let url = 'https://www.flipkart.com/cosmic-byte-cb-gk-02-corona-wired-7-color-rgb-backlit-effects-anti-ghosting-usb-gaming-keyboard/p/itmeyefkgwpxsmgk';
// let url = 'https://www.flipkart.com/lenovo-legion-m200-wired-optical-gaming-mouse/p/itmffegkcch6a5pp';
let url = 'https://www.flipkart.com/flipkart-smartbuy-mp406-mousepad/p/itm832563ec25943?pid=ACCFJZGXK8PWGHS8&lid=LSTACCFJZGXK8PWGHS8ZCQYYC&marketplace=FLIPKART&srno=b_1_35&otracker=hp_reco_Discounts%2Bfor%2BYou_2_7.dealCard.OMU_cid%3AS_F_N_4rr_km5_r39__d_50-100__NONE_ALL%3Bnid%3A4rr_km5_r39_%3Bmp%3AF%3Bct%3Ad%3B_5&otracker1=hp_reco_WHITELISTED_personalisedRecommendation%2Fdiscount_Discounts%2Bfor%2BYou_DESKTOP_HORIZONTAL_dealCard_cc_2_NA_view-all_5&fm=personalisedRecommendation%2Fdiscount&iid=81d62083-cd8e-4a77-a4f6-2ec46ae38ea0.ACCFJZGXK8PWGHS8.SEARCH&ppt=browse&ppn=browse&ssid=hqhen19dgiggamf41578390709805';





//*function to log the details by arguments from the scraping inside getStatus function
const logStatus = (name, price, rating, availability) => {
    console.log('Name : ',name.text());
    console.log('Price : ',price.text());
    console.log('Rating : ',rating.text().slice(0,3));
    if(availability.text() == ''){
        console.log('Availability : Available!!🤩');
    }else{
        console.log('Availability : ',availability.text(),'😌');
    }
    
}


let currentDate = new Date();

const getStatus = async (urlValue) => {
    try{
        const response = await axios.get(urlValue);
        const $ =await cheerio.load(response.data);
        let productName = $('._35KyD6');
        let rating = $('.hGSR34');
        let availability = $('._9-sL7L');
        let price = $('._3qQ9m1');
        // logStatus(productName, price,rating,availability);

        //just formatting the availabilty value
        let availabilityStatus;
        if(availability.text() == ''){
            availabilityStatus =  'Available!!';
        }else{
            availabilityStatus = availability.text();
        }
        let details = {
            date : `${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}`,
            time : `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`,
            name : productName.text(),
            rating : rating.text().slice(0,3),
            availability : availabilityStatus,
            price : price.text()
        };
        //Instead of simply returning as json, I returned it as a promise and it worked!
        return new Promise((resolve, reject) => {
            resolve(details);
        });
    }
    catch(err){
        console.log(err);
    }
}


/**
 *TODO: adding id's to the objects
 *TODO: restricting the no. of elements inside the dataTable array
 *TODO: including get request to serve frontend files
 */

//Declaring data to be stored in json file
let database = {dataTable:[]};
let val,json;

/**
 * *Init Function
 * Main function which call the scrape function 
 * Writes and update scraped data to json file
 */
const init = () => {
    val = getStatus(url);
    val.then(result => {
            console.log(result);
            try{
                if(!fs.existsSync('./database.json')){
                    database.dataTable.push(result);
                    json = JSON.stringify(database);
                    fs.writeFile('database.json',json,(err)=>{
                        if(err){
                            console.log(err);
                        }
                    })
                }else{
                    fs.readFile('database.json',(err ,data) => {
                        if(err){
                            console.log(err);
                        }else{
                            //extracting the old data and parsing it to an object (which means converting it to an object)
                            database = JSON.parse(data);
                            //push the present data to the existing data
                            database.dataTable.push(result);
                            //write the data back to the database to update the database.json file
                            json = JSON.stringify(database);
                            fs.writeFile('database.json',json,(err) => {
                                if(err){
                                    console.log(err);
                                }else{
                                    console.log("Successfully Wrote into File");
                                }
                            });
        
                        }
                        
                    })
                }
            }catch(err){
                if(err){
                    console.log(err);
                }
            }
        });
}





//// setInterval(init, 10000);

/**-----------------------------------------------
 * *Cron Job Guide
 * Using this for scheduling as serInterval is not efficient;
 * to run a task every 5th second of a minute use '5 * * * * *'
 * to run a task every 5 seconds, use , "* /5" (without space between * and /) instead of "5" represents every 5 seconds;
 ---------------------------------------------------------*/

 
let interval = '10'; 
cron.schedule(`*/${interval} * * * * *`,()=>{
    console.log('Running every 10 seconds thanks to cron\n');
    init();
})



app.listen(8080,()=>console.log('Server Running @ PORT 3000!!'));




