const express = require('express'),
      bodyParser = require('body-parser'),
      uuid = require('uuid');

const morgan = require('morgan');
const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;


mongoose.connect('mongodb://localhost:27017/myFlixDB', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

app.use(bodyParser.json());

//log requests to server
app.use(morgan("common"));

//Default text response
app.get("/", (req, res) => {
  res.send("Welcome to MyFlix!");
});

app.get("/movies", (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.get("/users", function (req, res) {
  Users.find()
    .then(function (users) {
      res.status(201).json(users);
    })
    .catch(function (err) {
      console.err(err);
      res.status(500).send("Error: " + err);
    });
});

//Get JSON movie by title
app.get("/movies/:Title", (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.err(err);
      res.status(500).send("Error: " + err);
    });
});

app.get("/genre/:Name", (req, res) => {
  Genres.findOne({ Name: req.params.Name })
    .then((genre) => {
      res.json(genre.Description);
    })
    .catch((err) =>  {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Get director info
app.get("/director/:Name", (req, res) => {
  Directors.findOne({ Name: req.params.Name })
    .then((director) => {
      res.json(director);
    })
    .catch((err) => {
      console.error(err);
    });
  });

//Allow users to register
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(err);
            res.status(500).send("Error: " + error);
          });
      }
    });

  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.u4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
      res.status(400).send('users need names');
  }
  
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
});