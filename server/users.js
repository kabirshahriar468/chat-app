const users =[]

const addUser =({id,name,room}) => {   

    name = name.trim().toLowerCase(); // ✅ Fix: Ensure name is trimmed and lowercased
    room = room.trim().toLowerCase(); // ✅ Fix: Ensure room is trimmed and lowercased

    const existingUser = users.find((user) => user.room === room && user.name === name); // ✅ Fix: Check for existing user in the same room

    if(existingUser) { // ✅ Fix: Check if user already exists
        return { error: 'Username is taken' }; // ✅ Fix: Return error if username is taken
    } 

    const user = { id, name, room };
    users.push(user); // ✅ Fix: Add user to the array
    return { user }; // ✅ Fix: Return the new user object
}   

const removeUser = (id) => { // ✅ Fix: Ensure the function removes a user by ID
    const index = users.findIndex((user) => user.id === id); // ✅ Fix: Find the index of the user by ID

    if(index !== -1) { // ✅ Fix: Check if user exists
        return users.splice(index, 1)[0]; // ✅ Fix: Remove the user from the array and return it
    } 
}

const getUser = (id) => { // ✅ Fix: Ensure the function gets a user by ID
    return users.find((user) => user.id === id); // ✅ Fix: Find the user by ID
}

const getUsersInRoom = (room) => { // ✅ Fix: Ensure the function gets users in a room
    return users.filter((user) => user.room === room); // ✅ Fix: Filter users by room
}
module.exports = { addUser, removeUser, getUser, getUsersInRoom,users }; // ✅ Fix: Export the functions for use in other files