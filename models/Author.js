const mongoose = require('mongoose');
const  {str, date} = require('./datatypes');



const authorSchema = new mongoose.Schema({
    author_name: str,
    reader_id: str 
});

const author = mongoose.model('author', authorSchema);

module.exports = author;