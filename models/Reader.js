const mongoose = require('mongoose');
const  {str, date} = require('./datatypes');



const readerSchema = new mongoose.Schema({
    birth: date,
    city: str,
    author: str,
    subject: str,
    degree: str 
});

const reader = mongoose.model('reader', readerSchema);

module.exports = reader;