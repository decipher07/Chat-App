const users = []

// addUser , removeUser , getUser , getUserInRoom 

const addUser = ({ id, username, room}) => {
    // Clean The Data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // Validate The Data 
    if (!username || !room){
        return {
            error: 'Username and Rooms Are Required'
        }
    }

    // Checking for Existing Users 
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    
    // Validate Username
    if (existingUser){
        return {
            error: 'Username is in Use'
        }
    }

    // Store User
    const user = {id , username, room}
    users.push(user)
    return { user }

}

const removeUser = ( (id) => {
    const index = users.findIndex( (user) => {
        return user.id === id  
    })

    if (index !== -1){
        return users.splice(index, 1)[0]
    }
})


const getUser = (id) => {
    return users.find( (user) => user.id === id)
}

const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter( (user) => user.room === room)
}


addUser({
    id: 22, 
    username: 'DJ',
    room: 'North Calioni'
})

addUser({
    id: 32, 
    username: 'Ross',
    room: 'North Calioni'
})

addUser({
    id: 42, 
    username: 'Tera',
    room: 'North Calioni'
})

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}

// const userList = getUsersInRoom('North Calioni')
// console.log
// console.log(users)
// const a = getUser(42)
// console.log(a)
// const removedUser = removeUser(22)

// console.log(removedUser)


// console.log(users)
