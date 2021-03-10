const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OnePerios = new Schema({
    redBall:[Number],
    blueBall:Number,
    date:String,
    perios:String,
})

mongoose.model('OnePerios',OnePerios)

export {}
