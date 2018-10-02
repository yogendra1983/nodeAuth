const mongoose = require("mongoose");

const emp_schema = mongoose.Schema({
    name:{
        type: String,
        required: "Empoly name is mandatory"
    },
    emailId: {
    type: String,
    required: "Email ID is Mandatory"
    }
});

module.exports = mongoose.model("employ", emp_schema);