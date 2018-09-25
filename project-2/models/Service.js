const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const serviceSchema = new Schema ({
title: String,
//serviceDate: Date,
serviceExpiresDate: Date,
user: {type : Schema.Types.ObjectId, ref: 'User'},
//agent:  { type: Schema.Types.ObjectId, ref: 'User' },
serviceDescription: String,
picPath: String,
picName: String,
location: { type: { type: String }, coordinates: [Number] },



},
{ 
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})


//serviceSchema.set('timestamps', true);
const Service = mongoose.model('Service', serviceSchema)

module.exports = Service;


// const User = mongoose.model('User', userSchema);
// module.exports = User;