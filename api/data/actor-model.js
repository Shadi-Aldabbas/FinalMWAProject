const mongoose = require("mongoose");
const { moviesSchema } = require("./movie-model");
const actorSchema = mongoose.Schema({
  name: {
    type: String,
    required:true,
  },
  year: {
    type: Number,
    max:2022
  },
  movies: [moviesSchema],
});
mongoose.model("Actor", actorSchema, "actors");
module.exports = {
  actorSchema,
};
