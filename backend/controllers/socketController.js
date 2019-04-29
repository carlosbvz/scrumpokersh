// Players Structure
function Player(data = {}) {
    this.id = data.id;
    this.name = data.name;
    this.score = data.score || null;
    this.shouldDisconnect = false;
}
Player.prototype.setDisconnection = function() {
    return this.shouldDisconnect;
}

const playersHandler = {
    players: [],
    add(newPlayer) {
        let shouldAddNewPlayer = true;
        this.players.map( player => {
            if (player.id === newPlayer.id) shouldAddNewPlayer = false;
        });
        if (shouldAddNewPlayer) this.players.push(newPlayer);
    },
    removeById(playerId) {
        this.players = this.players.filter( player => {
            return player.id !== playerId;
        });
    },
    update(updatedPlayer) {
        this.players = this.players.map( player => {
            if (player.id === updatedPlayer.id) return Object.assign(player,updatedPlayer);
            else return player;
        });
    },
    getById(id) {
        return this.players.find(player => player.id === id);
    },
    getAll() {
        return this.players;
    }
};

const socketsHandler = (socket) => {
    console.log('an user connected with socketid: ');
    
    socket.on('disconnect', () => {
        console.log('user disconnected with playerId: ');
    });
    socket.on('add player', (playerData) => {
        playersHandler.add(new Player(playerData));
        socket.playerId = playerData.id;
    });
    socket.on('send user story', (userStory) => {
        socket.broadcast.emit('user story from server', userStory);
    });
}

module.exports = {
    socketsHandler,
    playersHandler
}