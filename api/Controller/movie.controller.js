const mongoose = require("mongoose");
const Actor = mongoose.model(process.env.ACTOR_MODEL);


const SUCCESS_STATUS_CODE = process.env.SUCCESS_STATUS_CODE;
const CREATED_STATUS_CODE = process.env.CREATED_STATUS_CODE;
const NO_CONTENT_STATUS_CODE = process.env.NO_CONTENT_STATUS_CODE;
const BAD_REQUEST_STATUS_CODE = process.env.BAD_REQUEST_STATUS_CODE;
const NOT_FOUND_STATUS_CODE = process.env.NOT_FOUND_STATUS_CODE;
const SERVER_ERROR_STATUS_CODE = process.env.SERVER_ERROR_STATUS_CODE;

const NOT_FOUND_MSG = process.env.NOT_FOUND_MSG;
const QUERYSTRING_SHOULD_BE_NUMBER_MSG = process.env.QUERYSTRING_SHOULD_BE_NUMBER_MSG;
const CANNOT_EXCEED_COUNT_MSG = process.env.CANNOT_EXCEED_COUNT_MSG;


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
    res.status(BAD_REQUEST_STATUS_CODE).json({ message: QUERYSTRING_SHOULD_BE_NUMBER_MSG });
    return;
  }
  if (count > maxCount) {
    res.status(BAD_REQUEST_STATUS_CODE).json({ message: CANNOT_EXCEED_COUNT_MSG,  maxCount });
    return;
  }
  Actor.findById(actorId).select("movies").skip(offset)
    .limit(count).exec()
    .then((actor) => {
      if (actor) {
        res.status(SUCCESS_STATUS_CODE).json(actor.movies);
      }
      else {
        res.status(NOT_FOUND_STATUS_CODE).json(NOT_FOUND_MSG);
      }
    })
    .catch((err) => {
      res.status(SERVER_ERROR_STATUS_CODE).json(err);
    })
};

const getMovie = (req, res) => {
  const actorId = req.params.actorId;
  const movieId = req.params.movieId;

  Actor.findById(actorId).select("movies").exec()
    .then((actor) => {
      if (actor.movies.id(movieId)) {
        res.status(SUCCESS_STATUS_CODE).json(actor.movies.id(movieId));
      }
      else {
        res.status(NOT_FOUND_STATUS_CODE).json(NOT_FOUND_MSG);
      }
    })
    .catch((err) => {
      res.status(SERVER_ERROR_STATUS_CODE).json(err);
    })
};

const _addMovie = (req, res, actor) => {
  actor.movies = [
    ...actor.movies,
    {
      "name": req.body.name,
      "year": req.body.year
    }
  ];
  actor.save()
  .then((updatedActor)=>{
    res.status(CREATED_STATUS_CODE).json(updatedActor.movies);
  })
  .catch((err)=>{
    res.status(SERVER_ERROR_STATUS_CODE).json(err);
  })
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

  Actor.findById(actorId).select("movies").exec()
  .then((actor) => {
    if(actor){
      movieUpdateCallback(req,res,actor);
    }else{
      res.status(NOT_FOUND_STATUS_CODE).json(NOT_FOUND_MSG);
    }
  })
  .catch((err) => {
    res.status(SERVER_ERROR_STATUS_CODE).send(err.message);
  });

}

const _fullMovieUpdate = (req, res, actor) => {
  const movieId = req.params.movieId;

  actor.movies.id(movieId).name = req.body.name;
  actor.movies.id(movieId).year = req.body.year;
  actor.save()
    .then((updatedActor) => {
      res.status(NO_CONTENT_STATUS_CODE).json(updatedActor);
    })
    .catch((err) => {
      res.status(SERVER_ERROR_STATUS_CODE).send(err.message);
    });
}

const fullUpdateOne = (req, res) => {
  _updateMovie(req, res, _fullMovieUpdate);
}


const deleteMovie = (req, res) => {
  const actorId = req.params.actorId;
  const movieId = req.params.movieId;

  Actor.findById(actorId)
    .then((actor) => {
      if (actor) {

        actor.movies.id(movieId).remove((removeerr) => {
          if (removeerr) {
            res.status(SERVER_ERROR_STATUS_CODE).send(removeerr.message);
          }
        });
        actor.save()
          .then((saveResult) => {
            res.status(NO_CONTENT_STATUS_CODE).json(saveResult);
          })
          .catch((saveError) => {
            res.status(SERVER_ERROR_STATUS_CODE).send(saveError.message);
          });

      } else if (!actor) {
        res.status(NOT_FOUND_STATUS_CODE).send(NOT_FOUND_MSG);
      }
    })
    .catch((err) => {
      res.status(SERVER_ERROR_STATUS_CODE).send(err.message);
    })
}

module.exports = {
  getAllMovies,
  getMovie,
  addMovie,
  fullMovieUpdate: fullUpdateOne,
  deleteMovie
};