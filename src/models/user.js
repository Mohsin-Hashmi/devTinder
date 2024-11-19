const mongoose = require("mongoose");

/** Creating the Schema */
const userSchema = new mongoose.Schema({
 
  firstName: {
    type: String,
    required:true,
    minLength:4,
    maxLength:50,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
  },
  password: {
    type: String,
    required:true
  },
  age: {
    type: Number,
    min:18,
    
  },
  gender: {
    type: String,
    validate(value){
      if(!["male","female","others"].includes(value)){
        throw new Error("Invalid gender");
      }
    }
  },
  photoUrl:{
    type:String,
  },
  about:{
    type:String,
    default: "This is a default about of the user",
  },
  skills:{
    type: [String],
    validate:[
      {
        validator: function(value){
          return value.length >=1;
        },
        message:"The minimun skills required is 1"
      },
      {
        validator:function(value){
          return value.length <=10;
        },
        message:"The maximum skills required is 10"
      }
    ]
  }
},{
  timestamps:true,
});

/** Creating the model */
const User= mongoose.model("User", userSchema);
module.exports= User;