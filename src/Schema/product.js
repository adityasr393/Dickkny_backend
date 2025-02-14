const mongoose = require("mongoose");

const product = new mongoose.Schema({
  
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId ,ref:"Users"},
  price:{type:String,required:true},
  description: { type: String },
  image: { type: String },
  size: { type: String },
  color: { type: String },

},{timestamps:true});

module.exports = mongoose.model("product", product);
