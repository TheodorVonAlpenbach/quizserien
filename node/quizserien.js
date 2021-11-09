const express = require('express')
const chalk = require('chalk') // this doesn't work with cygwin terminal
const debug = require('debug')('app')
const morgan = require('morgan')
const path = require('path')

const app = express()

app.use(morgan('tiny'))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

var port = 3001

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/about', (req, res) => {
  res.send('Hallo, verden!')
})

app.get('/rest', (req, res) => {
  res.send('You get a list of rests')
})

app.get('/rest/:id', (req, res) => {
  res.send(`You get the rest with ID ${req.params.id}`)
})

app.listen(port, () => {
    debug(`Example app listening at localhost on port ` + chalk.green(3000))
})
