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
 rating:{type:Number,default:0},
 feedback:{type:String,default:''},
 client: { type: Schema.Types.ObjectId, ref: 'Client' },
 milestones:[{title:String,description:String,completed:Boolean,amount:Number}]
},{timestamps:true})

  
  module.exports = model("Project", projectSchema);