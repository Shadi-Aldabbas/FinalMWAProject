const express = require("express");
const router = express.Router();
const actorController = require("../Controller/actor.controller");
const movieController = require("../Controller/movie.controller");
const authenticationController = require("../Controller/auth.controller");


router.route("/:actorId/movies/:movieId")
  .get(movieController.getMovie)
  .put(authenticationController.authenticate,movieController.fullMovieUpdate)
  .delete(authenticationController.authenticate,movieController.deleteMovie);

router.route("/:actorId/movies")
  .get(movieController.getAllMovies)
  .post(authenticationController.authenticate,movieController.addMovie)
  
router.route("/:actorId")
  .get(actorController.getActor)
  .delete(authenticationController.authenticate,actorController.deleteActor)
  .put(authenticationController.authenticate,actorController.fullUpdateActor)
;
  
router.route("")
  .get(actorController.getAllActors)
  .post(authenticationController.authenticate, actorController.addActor)

module.exports = router;
