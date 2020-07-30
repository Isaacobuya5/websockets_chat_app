const users = [];

// add user
const addUser = ({id, username, room }) => {
    // clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // validate the data
    if (!username || !room) {
        return {
            error: 'Username and room are required'
        }
    }

    // check for existing user
    const existingUser = users.find(user => {
        return user.room === room && user.username === username
    })

    // validate username
    if (existingUser) {
        return {
            error: 'Username is in use'
        }
    }

    // valid user store
    const user = {id, username, room};
    users.push(user);
    return { user }
}

// remove the user from room
const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id);
    if (index != -1) {
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => {
    return users.find(user => user.id === id);
}

const getUsersInRoom = (room) => {
    return users.filter(user => user.room === room);
}

    addUser({
        id: 22,
        username: 'isaac',
        room: 'sports'
    })

    addUser({
        id: 25,
        username: 'mike',
        room: 'sports'
    })

    addUser({
        id: 22,
        username: 'tom',
        room: 'java'
    })

    const user = getUser(29)
    console.log(user);
    const usersInRoom = getUsersInRoom('python');
    console.log(usersInRoom);

