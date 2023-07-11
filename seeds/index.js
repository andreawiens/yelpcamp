const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({}); //Empty the database
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "6495ce7c3375d7566670f5fa",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            /*Shorthand for price: {price}*/
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus, in. Iusto aspernatur neque ipsa corporis quisquam. Ab maiores sed in numquam atque, quibusdam sapiente repudiandae eaque. Velit voluptatem laboriosam saepe?",
            images: [{
                    url: 'https://res.cloudinary.com/dif5lsalz/image/upload/v1688239476/YelpCamp/vrkpspon7q6qlcrf6j4m.jpg',
                    filename: 'YelpCamp/vrkpspon7q6qlcrf6j4m'
                },
                {
                    url: 'https://res.cloudinary.com/dif5lsalz/image/upload/v1688239478/YelpCamp/lew7b2ngkwa5mjezdeh9.jpg',
                    filename: 'YelpCamp/lew7b2ngkwa5mjezdeh9'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})