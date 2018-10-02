const mongoose = require("mongoose");
require("dotenv").config();

//const mongooseDBErrors = require("mongoose-mongodb-errors");

mongoose.Promise = global.Promise;
//mongoose.plugin(mongooseDBErrors);
console.log(process.env.MONGOURI);

mongoose.connect(process.env.MONGOURI);
