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



const getAllActors = (req, res) => {
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
    res.status(BAD_REQUEST_STATUS_CODE).json({ message: CANNOT_EXCEED_COUNT_MSG, maxCount });
    return;
  }
  Actor.find().skip(offset).limit(count).exec()
    .then((actors) => {
      res.status(SUCCESS_STATUS_CODE).json(actors);
    })
    .catch((err) => {
      res.status(SERVER_ERROR_STATUS_CODE).json(err);
    })
};

const getActor = (req, res) => {
  const actorId = req.params.actorId;
  Actor.findById(actorId).exec()
    .then((actor) => {
      if (actor) {
        res.status(SUCCESS_STATUS_CODE).json(actor);
      }
      else {
        res.status(NOT_FOUND_STATUS_CODE).json(NOT_FOUND_MSG);
      }
    })
    .catch((err) => {
      res.status(SERVER_ERROR_STATUS_CODE).json(err);
    })
};

const addActor = (req, res) => {
  const newActor = {
    name: req.body.name, year: req.body.year,
    movies: req.body.movies
  };
  Actor.create(newActor)
    .then((actor) => {
      res.status(CREATED_STATUS_CODE).json(actor);
    })
    .catch((err) => {
      res.status(SERVER_ERROR_STATUS_CODE).json(err);
    })
}


const fullUpdateActor = (req, res) => {
  actorUpdate = (req, res, actor, response) => {
    actor.name = req.body.name;
    actor.year = req.body.year;
    actor.movies = req.body.movies;
    actor.save()
      .then((updatedActor) => {
        res.status(NO_CONTENT_STATUS_CODE).json(updatedActor);
      })
      .catch((err) => {
        res.status(SERVER_ERROR_STATUS_CODE).json(err);
      })
  }
  _updateOne(req, res, actorUpdate);
}

const _updateOne =  (req, res, updateActorCallback) => {
  const actorId = req.params.actorId;
  Actor.findById(actorId).exec()
  .then((actor) => {
    if (actor) {
      updateActorCallback(req, res, actor);
    } else {
      res.status(NOT_FOUND_STATUS_CODE).json(NOT_FOUND_MSG);
    }
  })
  .catch((err) => {
    res.status(SERVER_ERROR_STATUS_CODE).json(err);
  });;
}

// const partialUpdateActor = function (req, res) {
//   console.log("Full Update One Actor Controller");
//   actorUpdate = function (req, res, actor, response) {
//     console.log(req.body.name);
//     if (req.body.name) { actor.name = req.body.name; }
//     if (req.body.year) { actor.year = req.body.year; }
//     if (req.body.designers) { actor.designers = req.body.designers; }
//     actor.save(function (err, updatedActor) {
//       if (err) {
//         response.status = 500;
//         response.message = err;
//       }
//       res.status
//         (response.status).json
//         (response.message);
//     });
//   }
//   _updateOne(req, res, actorUpdate);
// }


const deleteActor = (req, res) => {
  const actorId = req.params.actorId;
  Actor.findByIdAndDelete(actorId).exec()
    .then((deletedActor) => {
      if (deletedActor) {
        res.status(NO_CONTENT_STATUS_CODE).json(deletedActor);
      } else {
        res.status(NOT_FOUND_STATUS_CODE).json(NOT_FOUND_MSG);
      }
    })
    .catch((err) => {
      res.status(SERVER_ERROR_STATUS_CODE).json(err);
    });
}
module.exports = {
  getAllActors,
  getActor,
  addActor,
  deleteActor,
  fullUpdateActor,
  // partialUpdateActor
};
