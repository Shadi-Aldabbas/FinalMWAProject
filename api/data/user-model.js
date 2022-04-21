const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: String,
  username: {
    type: String,
    required:true,
    unique:true,
  },
  password: {
    type: String,
    required:true,
    min:3
  },
});
mongoose.model("User", userSchema, "users");

module.exports = {
  userSchema,
};
