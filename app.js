const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Campground = require('./models/campground')

const PORT = 3000


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log("Database connected")
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', {campgrounds})
})

app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/show', {campground})
})


app.listen(PORT, () => {
    console.log("Server ON!.")
    console.log('Port is', PORT)
})

