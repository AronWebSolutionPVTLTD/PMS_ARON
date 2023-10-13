const {Schema,model} = require("mongoose");

const projectSchema = new Schema({
title:String,
description:String,
 starting_date:String ,
 ending_date: String,
 status: String,
 country:String,
 users:{type:Schema.Types.ObjectId,ref:'User'},
 contractValue:String,
 contractType:String,
 client: { type: Schema.Types.ObjectId, ref: 'Client' }
},{timestamps:true})


  
  module.exports = model("Project", projectSchema);