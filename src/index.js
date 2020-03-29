const express = require('express')
const socketio = require('socket.io')
const path = require('path')
const http = require('http')
const Filter = require('bad-words')
const { generateMessage , generateLocationMessage} = require ('./utils/messages')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000 
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New WebSocket Connection')


    socket.emit('message', generateMessage('Welcome!'))
    socket.broadcast.emit('message', generateMessage('A New User Has Joined '))
    
    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        if(filter.isProfane(message)){
            return callback('Profanity is not allowed')
        }

        
        io.emit('message', generateMessage(message) )
        callback()  
    })

    socket.on('sendLocation', (cords, callback) => {
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${cords.latitude},${cords.longitude}`))
        callback()
    })


    
    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A User Has Left'))
    })
})

server.listen (port , () => {
    console.log(`The Server is Up On The Port ${port}`)
})


    // let count = 0
    // socket.emit('countUpdated', count)
    // socket.on('increment', () => {
    //     count++
    //     io.emit('countUpdated', count)
    //     //socket.emit('countUpdated', count)
    // })