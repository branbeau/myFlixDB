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
      res.status(200).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Get all users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.err(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get a user by username
app.get('users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
  .then((user) => {
    res.json(user);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error:' + err);
  })
});
  
// Update user's info by username
app.put('users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
  {
    Username: req.body.Username,
    Password: req.body.Password,
    Email: req.body.Email,
    Birthday: req.body.Birthday
  }
},
{ new: true }, // This line makes sure that the updated document is returned.
( err, updatedUser) => {
  if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', (req, res) => {
  Users.FindOneAndUpdate({ Username: req.params.Username }, {
    $push: { FavoriteMovies: req.params.MovieID }
  },
  { new: true }, // This line makes sure that the updated document is returned. 
  (err, updatedUser) => {
    if (err) {
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// Delete a user by username
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
  .then((user) => {
    if(!user) {
      res.status(400).send(req.params.Username + ' was not found ');
    } else {
      res.status(200).send(req.params.Username + ' was deleted ');
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error ' + err);
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

// Get genre
app.get("/genre/:Name", (req, res) => {
  Movies.findOne({ Genre.Name: req.params.Name }).select("Genre")
    .then((genre) => {
      res.json(genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Get director info
app.get("/director/:Name", (req, res) => {
  Movies.findOne({ Director.Name: req.params.Name }).select("Director")
    .then((director) => {
      res.json(director);
    })
    .catch((err) => {
      console.error(err);
    });
  });

//Allow users to register and deregister
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if(user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
          .then((user) => {
            res.status(201).json(user)
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
        }
    })
    .catch((error => {
      console.error(error);
      res.status(500).send('Error: ' + error);
   });
});
app.listen(8080, () => {
  console.log('Listening on port 8080');
});