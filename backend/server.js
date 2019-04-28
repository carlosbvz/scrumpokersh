const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const { socketsHandler } = require('./controllers/socketController');
const apiRoutes = require('./routes/apiRoutes');

const API_PORT = 3001;

app.use('/api', apiRoutes);

io.on('connection', socketsHandler);

// launch our backend into a port
http.listen(API_PORT, function(){
    console.log(`listening on *:${API_PORT}`);
});