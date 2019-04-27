const playersHandler = {
    players: [],
    addPlayer(playerName) {
        this.players.push({playerName})
    },
    getPlayers() {
        return this.players;
    }
};


const socketsHandler = (socket) => {
    console.log('an user connected');
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('add player', (playerName) => {
        playersHandler.addPlayer(playerName);
        socket.broadcast.emit('player added', playerName);
    });
    socket.on('send user story', (userStory) => {
        socket.broadcast.emit('user story from server', userStory);
    });
}
module.exports = {
    socketsHandler
}