// Players Structure
function Players(data) {
    this.name = data.name;
    this.socket = data.socket || null;
    this.score = data.score || null;
}

const playersHandler = {
    players: [],
    addPlayer(player) {
        this.players.push(player)
    },
    findPlayerBySocketId(socketId) {
        return this.players.filter( player => {
            console.log(player.socket.id)
        });
    },
    removePlayer(socketId) {

    },
    getPlayers() {
        return this.players.map(player => {
            return {
                    id: player.socket.id,
                    name: player.name,
                    score: player.score
                };
        });
    }
};

const socketsHandler = (socket) => {
    console.log('an user connected');
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('add player', (playerName) => {
        playersHandler.addPlayer(new Players({name: playerName, socket}));
    });
    socket.on('send user story', (userStory) => {
        socket.broadcast.emit('user story from server', userStory);
    });
}

module.exports = {
    socketsHandler,
    playersHandler
}