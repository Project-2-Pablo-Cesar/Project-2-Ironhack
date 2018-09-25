const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ratingSchema = new Schema({
content : String,
authorId : {type: Schema.Types.ObjectId, ref: 'User'},
destinationComment : {type: Schema.Types.ObjectId, ref: 'User'}


})


const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating