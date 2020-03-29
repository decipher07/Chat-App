const socket = io()

//Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = document.querySelector('input')
const $messageFormButton = document.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML

socket.on('message', (Message) => {
    console.log(Message)
    const html = Mustache.render(messageTemplate,{
        message: Message.text,
        createdAt: moment(Message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('locationMessage', (message) => {
    console.log(message)
    const html = Mustache.render(locationMessageTemplate,{
        url: message.url,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    $messageFormButton.setAttribute('disabled', 'disabled')
    
    

    // Disable 
    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (error) => {
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()    
        // Enable

        if (error){
            return console.log(error)
        }

        console.log('Message Delivered! ')
    })
})

$sendLocationButton.addEventListener('click', () => {
    if (!navigator.geolocation){
        return alert('GeoLocation is Not Supported By Your Browser')
    }

    $sendLocationButton.setAttribute('disabled', 'disabled') 
    

    navigator.geolocation.getCurrentPosition( (position) => {
        latitude = position.coords.latitude
        longitude = position.coords.longitude
       
        socket.emit('sendLocation', {
            latitude, longitude
        }, () => {
            $sendLocationButton.removeAttribute('disabled')
            console.log('Location Shared!')
        })
    })


})

// console.log(socket)

// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('Clicked')
//     socket.emit('increment')
// })

// socket.on('countUpdated', (count) => {
//     console.log(`The count has been Updated ${count}`)
// })
