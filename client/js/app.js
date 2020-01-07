const form = document.querySelector('#urlSubmitForm');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log(e.target[0].value);
    fetch(e.target.action, {
        method : 'POST',
        body : {url : e.target[0].value}
    })
    .then(console.log('Request sent'))
})