/**
 * TODO: Get the link from the server and insert it at the 'view in flipkart' part of the frontend site.
 */

let ctx = document.getElementById('myChart');
let title = document.querySelector('.card-title');
let rating = document.querySelector('.rating-value');
let price = document.querySelector('.price-value');
let availability = document.querySelector('.availability-value');


let databasePrice = [];
let databaseTime = [];

/**
 ** Fetching data from database.json file
 */
fetch('../../database.json')
    .then(res => res.json())
    .then(json => {
        // console.log(json.dataTable);
        json.dataTable.forEach(elementObj => {
            console.log(title);
            title.innerText = elementObj.name;
            rating.innerText = elementObj.rating;
            price.innerText = elementObj.price;
            availability.innerText = elementObj.availability;

            /**
             * *Here we are slicing the string to avoid '₹'
             */
            databasePrice.push(parseInt(elementObj.price.slice(1,elementObj.price.length),10));
            databaseTime.push(elementObj.time);
            
        })

        createChart(databaseTime, databasePrice);
    });




const createChart = (time/**X-axis */, price/**Y-axis */) =>{

    let myChart = new Chart(ctx,  {
        type: 'bar',
        data: {
            //x-axis
            labels: time,
            datasets: [{
                label: 'Price History',
                //y-axis
                data: price, 
            }]
        }
    });
}
    