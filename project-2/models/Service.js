const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const serviceSchema = new Schema ({
title: String,
serviceDate: Date,
serviceExpiresDate: Date,
user: {type : Schema.Types.ObjectId, ref: 'User'},
agent:  { type: Schema.Types.ObjectId, ref: 'User' },
serviceDescription: String,
picPath: String,
picName: String,
location: { type: { type: String }, coordinates: [Number] }


})


serviceSchema.set('timestamps', true);
const serviceSchema = mongoose.model('Service', serviceSchema);

module.exports = Service;
