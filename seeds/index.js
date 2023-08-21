const mongoose = require('mongoose')
const cities = require('./cities')
const {descriptors, places} = require('./seedHelpers')
const Campgroud = require('../models/campground')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')


const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log("Database connected")
})

const sample = array => array[Math.floor(Math.random()*array.length)]

const seedDB = async () => {
    await Campgroud.deleteMany({})
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random()*1000)
        const camp = new Campgroud({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save()
    }
}

seedDB().then(() => {
    db.close()
})

