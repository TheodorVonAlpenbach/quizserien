const express = require('express')
const chalk = require('chalk') // this doesn't work with cygwin terminal
const debug = require('debug')('app')
const morgan = require('morgan')
const path = require('path')
const fs = require('fs')
const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();
var app = express();

app.use(morgan('tiny'))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
app.use('/js', express.static(path.join(__dirname, 'public/js')))

const port = process.env.PORT

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/about', (req, res) => {
  res.send('Hallo, verden!')
})

app.get('/rest', (req, res) => {
  res.send('You get a list of rests')
})

app.get('/pubdata', (req, res) => {
    const filename = path.join(__dirname, '/../data/data.json');
    fs.readFile(filename, 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        console.log('File data:', jsonString) 
        res.send(jsonString);
    })
})

app.get('/testget', (req, res) => {
    fetch('http://localhost:/pubdata')
        .then(jsonString => jsonString.json())
        .then(json => res.send(json));
})

// app.get('/testget', (req, res) => {
//     const dataRaw = fetch('http://localhost:3001/pubdata');
//     const data = dataRaw;
//     const firstRow = data[0];
//     debugger;
//     res.send(firstRow["Poeng"]);
// })


app.get('/rest/:id', (req, res) => {
  res.send(`You get the rest with ID ${req.params.id}`)
})

app.listen(port, () => {
    debug(`Example app listening at localhost on port ` + chalk.green(port))
})
