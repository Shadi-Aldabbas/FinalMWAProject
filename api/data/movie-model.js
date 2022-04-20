const mongoose = require("mongoose");
const moviesSchema = mongoose.Schema({
  name: {
    type: String,
    required:true,
  },
  year: {
    type: Number,
    max:2023,
  },
});
module.exports = {
  moviesSchema,
};
