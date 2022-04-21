const express = require("express");
const router = express.Router();
const actorController = require("../Controller/actor.controller");
const movieController = require("../Controller/movie.controller");


router.route("/:actorId/movies/:movieId")
  .get(movieController.getMovie) // tested
  .put(movieController.fullMovieUpdate) // tested
  .delete(movieController.deleteMovie); // tested

router.route("/:actorId/movies")
  .get(movieController.getAllMovies) // tested
  .post(movieController.addMovie) // tested
  
router.route("/:actorId")
  .get(actorController.getActor) // tested
  .delete(actorController.deleteActor) // tested
  .put(actorController.fullUpdateActor) // tested
;
  
router.route("")
  .get(actorController.getAllActors) // tested
  .post(actorController.addActor) // tested

module.exports = router;
