const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value
    messageTwo.textContent = 'loading'
    fetch('http://localhost:3000/weather?address=' + location).then(response => {
        response.json().then(data => {
            if (data.errorMessage) {
                console.log(data.errorMessage);
                messageTwo.textContent = data.errorMessage;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
                console.log(data.location);
                console.log(data.forecast);
            }
        })
    })
})