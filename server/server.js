const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const io = require('socket.io')(http);
const { socketsHandler } = require('./controllers/socketController');
const apiRoutes = require('./routes/apiRoutes');

const API_PORT = 3001;

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/build')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api', apiRoutes);

// Handles any requests that doesn't match the ones above
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/build/index.html'));
});

io.on('connection', socketsHandler);


// launch our backend into a port
http.listen(API_PORT, function(){
    console.log(`listening on *:${API_PORT}`);
});