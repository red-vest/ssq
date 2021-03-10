const {dbPath} = require('../config');
const mongoose = require('mongoose');

require('./schema/test');
require('./schema/history');
require('./schema/onePerios');


const database = () => {
    mongoose.set('debug', true);
    mongoose.connect(dbPath,{useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.connection.on('disconnected', () => {
        mongoose.connect(dbPath,{useNewUrlParser: true, useUnifiedTopology: true})
    })
    mongoose.connection.on('error', err => {
        console.error(err)
    })

    mongoose.connection.on('open', async () => {
        console.log('Connected to MongoDB ', dbPath)
    })
}

database()
