const users = [];

// 유저를 chat에 연결
function userJoin(id, username, room) {
    const user = { id, username, room };

    users.push(user);

    return user;
}

// 현재 유저 가져오기
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

// 사용자가 방을 나갈 때
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    if(index !== -1) {
        return users.splice(index, 1)[0];
    }
}

//get room users
function getRoomUsers(room){
    return users.filter(user => user.room === room);

}



// 사용자 가입을 내보내고 현재 사용자를 가져옴
module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}

