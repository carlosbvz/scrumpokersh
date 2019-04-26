const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const API_PORT = 3001;
const app = express();
app.use(cors());

app.get('/data',function(req,res) {
    res.json('index.html');
});


// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));