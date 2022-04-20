const mongoose = require("mongoose");
const Actor = mongoose.model(process.env.ACTOR_MODEL);

const getAllMovies = (req, res) => {
  const actorId = req.params.actorId;
  let offset = parseInt(process.env.DEFAULT_FIND_OFFSET, 10);
  let count = parseInt(process.env.DEFAULT_FIND_COUNT, 10);
  const maxCount = parseInt(process.env.DEFAULT_MAX_FIND_LIMIT, 10);

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  if (req.query && req.query.count) {
    offset = parseInt(req.query.count, 10);
  }
  if (isNaN(offset) || isNaN(count)) {
    res.status(400).json({ "message": "QueryString Offset and Count should be numbers" });
    return;
  }
  if (count > maxCount) {
    res.status(400).json({ "message": "Cannot exceed count of " + maxCount });
    return;
  }
  Actor.findById(actorId).select("movies").skip(offset)
    .limit(count).exec((err, actor) => {
      const response = {
        status: 200,
        message: actor.movies
      };
      if (err) {
        response.status = 500;
        response.message = err;
      }
      else if (!actor.movies) {
        response.status = 404;
        response.message = { "message": `actor with ID:${actorId} has no movies` };
      }
      res.status(response.status).json(response.message);
    });
};

const getMovie = (req, res) => {
  const actorId = req.params.actorId;
  const movieId = req.params.movieId;
  console.log("movieId", movieId);
  Actor.findById(actorId).select("movies").exec(function (err, actor) {
    const response = {
      status: 200,
      message: actor.movies.id(movieId)
    };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    else if (!actor.movies.id(movieId)) {
      response.status = 404;
      response.message = { "message": `movies ID:${movieId} not found` };
    }
    res.status(response.status).json(response.message);
  });
};

const _addMovie = (req, res, actor) => {
  actor.movies = [
    ...actor.movies,
    {
      "name": req.body.name,
      "year": req.body.year
    }
  ];
  actor.save(function (err, updatedActor) {
    const response = { status: 201, message: updatedActor.movies };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
}

const addMovie = (req, res) => {
  const actorId = req.params.actorId;
  Actor.findById(actorId).select("movies").exec((err, actor) => {
    const response = { status: 200, message: actor };
    if (err) {
      console.log("Error finding actor");
      response.status = 500;
      response.message = err;
    } else if (!actor) {
      console.log("Error finding actor");
      response.status = 404;
      response.message = { "message": "actor ID not found " + actorId };
    }
    if (actor) {
      _addMovie(req, res, actor);
    } else {
      res.status(response.status).json(response.message);
    }
  });
}

const _updateMovie = (req, res, movieUpdateCallback) => {
  const actorId = req.params.actorId;
  const movieId = req.params.movieId;
  Actor.findById(actorId).select("movies").exec((err, actor) => {
    const response = { status: 204, message: actor };
    if (err) {
      console.log("Error Finding actor");
      response.status = 500;
      response.message = err;
    } else if (!actor) {
      console.log("actor with given ID not found");
      response.status = 404;
      response.message = { message: "actor ID not found" };
    }
    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    }
    movieUpdateCallback(req, res, actor);
  });
}

const _fullMovieUpdate = (req, res, actor) => {
  console.log("_fullMovieUpdate");
  console.log(req.params.movieId);
  actor.movies.id(req.params.movieId).name = req.body.name;
  actor.movies.id(req.params.movieId).year = req.body.year;

  actor.save((err, updatedActor) => {
    const response = {
      status: 204,
      message: updatedActor.movies
    };
    if (err) {
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
}
const fullUpdateOne = (req, res) => {
  _updateMovie(req, res, _fullMovieUpdate);
}


const OLDdeleteMovie = (req, res, actor) => {
  const actorId = req.params.actorId;
  const movieId = req.params.movieId;
  console.log(actor);
  actor.save((err, updatedGame) => {
    const response = {
      status: 204,
      message: []
    };
    if (err) {
      response.status = 500;
      response.message = err;
    } else {
      response.status = 201;
      response.message = updatedGame.publisher;
    }
    res.status(response.status).json(response.message);
  });
}
const deleteMovie = (req, res) => {
  Actor.findById(req.params.actorId, (err, actor) => {
    if (!err) {
      if (!actor) {
        res.status(404).send('Movie was not found');
      }
      else {
        actor.movies.id(req.params.movieId).remove((removeerr, removresult) => {
          if (removeerr) {
            res.status(400).send(removeerr.message);
          }
        });
        actor.save((saveerr, saveresult) => {
          const response = {
            status: 204,
            message: []
          };
          if (saveerr) {
            response.status = 500;
            response.message = saveerr;
          } else {
            response.status = 204;
            response.message = saveresult;
          }
          res.status(response.status).json(response.message);
        });
      }
    } else {
      res.status(400).send(err.message);
    }
  });
}

module.exports = {
  getAllMovies,
  getMovie,
  addMovie,
  fullMovieUpdate: fullUpdateOne,
  deleteMovie
};