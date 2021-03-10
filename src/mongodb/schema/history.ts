const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const History = new Schema({
    period:String,
    date:String,
    redBall:[Number],
    blueBall:Number,
    redBallOrder:[Number],
    amountOne:Number,
    amountTwo:Number,
    firstPrizeAmount:Number,
    firstPrizeNumber:Number,
    secondPrizeAmount:Number,
    secondPrizeNumber:Number,
    thirdPrizeAmount:Number,
    thirdPrizeNumber:Number,
    fourthPrizeAmount:Number,
    fourthPrizeNumber:Number,
    fifthPrizeAmount:Number,
    fifthPrizeNumber:Number,
    createTime:Date
})
mongoose.model('History',History)

export {}
