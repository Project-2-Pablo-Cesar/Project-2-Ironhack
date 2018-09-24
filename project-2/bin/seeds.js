// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/project-2', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  { 
  name: "Pablo",
  email: "pablo.tabu@hotmal.com",  
  username: "Pablo",
  password: bcrypt.hashSync("pablo", bcrypt.genSaltSync(bcryptSalt)),
  role: 'ADMIN'
  },
  {
    name: "César",
    email: String,
    username: "cesar",
    password: bcrypt.hashSync("12345", bcrypt.genSaltSync(bcryptSalt)),
    role: 'ADMIN'
  }
]

User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})