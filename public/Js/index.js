
const weatherForm = document.querySelector('form')
const submit = document.querySelector('input')
const message1 = document.querySelector('#m1')
const message2 = document.querySelector('#m2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = submit.value

    message1.textContent = 'loading...'
    message2.textContent = ''

    fetch("/weather?address="+location).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = data.Address
                message2.textContent = data.Forecast
            }
        })
    })
})