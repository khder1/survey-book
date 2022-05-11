const Schema = require("mongoose").Schema;

const str = {
    type: String,
    // required: false
};
const date = {
    type: Number,
    //default: Date.now,
    // required: false
};


module.exports = {
                    str, date
                 };