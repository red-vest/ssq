const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Test = new Schema({
    name: String,
})

mongoose.model('Test',Test)
export {}
