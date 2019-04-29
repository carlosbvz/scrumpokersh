// Players Structure
function Player(data = {}) {
    this.id = data.id;
    this.name = data.name;
    this.score = data.score || null;
    this.socket = data.socket;
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
    deleteById(playerId) {
        this.players = this.players.filter( player => {
            return player.id !== playerId;
        }); 
    },
    deleteEstimates() {
        console.log('clearing estimates')
        this.players = this.players.map( player => {
            player.score = null;
            return player;
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
        const newPlayer = new Player(playerData);
        playersHandler.add(newPlayer);
    });
    socket.on('send user story', (userStory) => {
        socket.broadcast.emit('user story from server', userStory);
    });
}

module.exports = {
    socketsHandler,
    playersHandler
}