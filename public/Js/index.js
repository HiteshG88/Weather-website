
const weatherForm = document.querySelector('form')
const submit = document.querySelector('input')
const message1 = document.querySelector('#m1')
const message2 = document.querySelector('#m2')
const message3 = document.querySelector('#m3')
// const message4 = document.querySelector('#m4')
const message5 = document.querySelector('#m5')
const message6 = document.querySelector('#m6')
const message7 = document.querySelector('#m7')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = submit.value

    message1.textContent = 'loading...'
    message2.textContent = ''
    message3.textContent = ''
    message4.textContent = ''
    message5.textContent = ''
    message6.textContent = ''
    message7.textContent = ''

    fetch("/weather?address="+location).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            } else {
                console.log(String(message4.textContent));
                message1.textContent = data.Address 
                message2.textContent = data.forecast.CurrentTemp
                message3.textContent = data.forecast.FeelsLikeTemp
                // message4.textContent = data.forecast.Weather_description //! doesn't work
                message5.textContent = data.forecast.Humidity
                message6.textContent = data.forecast.Wind_speed
                message7.textContent = data.forecast.Visibility
            }
        })
    })
})