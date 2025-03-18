const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')


const path = require("path");
require('dotenv').config();
require('./db');

// connectToMongo();
const app = express()
const port = 5000
app.use('/uploads', express.static(path.join(__dirname, '../', 'uploads')));


app.use(cors())
app.use(express.json())

app.use('/api/auth',require(('./routes/auth')))
app.use('/api/notes',require(('./routes/notes')))

app.use(bodyParser.json());


app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`)
})

