const mongoose = require('mongoose');
const  {str, date} = require('./datatypes');



const subjectSchema = new mongoose.Schema({
    subject_name: str,
    reader_id: str 
});

const subject = mongoose.model('subject', subjectSchema);

module.exports = subject;