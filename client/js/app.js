let ctx = document.getElementById('myChart');
let title = document.querySelector('.card-title');
let rating = document.querySelector('#rating');
let price = document.querySelector('#price');
let availability = document.querySelector('#availability');

let databasePrice = [];
let databaseTime = [];
console.log(ctx);

/**
 ** Fetching data from database.json file
 */
fetch('../../database.json')
    .then(res => res.json())
    .then(json => {
        // console.log(json.dataTable);
        json.dataTable.forEach(elementObj => {
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
    