require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { check, validationResult } = require('express-validator');
const passport = require('passport');

const auth = require('./auth');

// Create express app
const app = express();

const moviesCollection = mongoose.connection.collection('movies');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());

auth(app, passport);

const movieSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Genre: {
    Name: {
      type: String,
      required: true
    },
    Description: {
      type: String,
      required: true
    }
  },
  Director: {
    Name: {
      type: String,
      required: true
    },
    Bio: {
      type: String
    },
    BirthYear: {
      type: Number
    }
  },
  ImagePath: {
    type: String,
    required: true
  }
});

// Require database library for MongoDB
const { MongoClient } = require('mongodb');

const dbName = 'cfDB';
const url = process.env.CONNECTION_URI || mongodb:'//127.0.0.1:27017/${dbName}';
const uri = url;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect()
  .then(() => {
    // Code to run after connecting to the database
  })
  .catch((error) => {
    console.error(error);
  });

    // Define movies collection as db.collection('movies')
    const cfDB = {
      movies: db.collection('movies')
    };

    cfDB.movies.find({}, (err, movies) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(movies);
    });

    app.get("/", (req, res) => {
      res.send("Welcome to MyFlix!");
    });

    const movies = require('./exported_collections/movies.json');
    const users = require('./exported_collections/users.json');
  
    app.get('/movies', (req, res) => {
      moviesCollection.find({}).toArray()
        .then((movies) => {
          res.json(movies);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500); // Or any other appropriate error status code
        });
    });

    app.get('/users', (req, res) => {
      usersCollection.find({}).toArray()
        .then((users) => {
          res.json(users);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500); // Or any other appropriate error status code
        });
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Get a user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).send('User not found');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error:' + err);
    });
});

// Update user's info by username
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true } // This line makes sure that the updated document is returned.
  )
    .then((updatedUser) => {
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).send('User not found');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', async (req, res) => {
  try {
    const updatedUser = await Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $push: { FavoriteMovies: req.params.MovieID } },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  }
});

app.post('/users', async (req, res) => {
  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
    .then((user) => {
      if (user) {
      //If the user is found, send a response that it already exists
        return res.status(400).send(req.body.Username + ' already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) => { res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

app.post('/users',
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 6}) which means
  //minimum value of 5 characters are only allowed
  [
    check('Username', 'Username is required').isLength({min: 6}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ], (req, res) => {

  // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
      .then((user) => {
        if (user) {
          //If the user is found, send a response that it already exists
          return res.status(400).send(req.body.Username + ' already exists');
        } else {
          Users.create({
              Username: req.body.Username,
              Password: hashedPassword,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) => { 
              res.status(201).json(user);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send('Error: ' + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
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
  Movies.findOne({ GenreName: req.params.Name }).select("Genre")
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
  Movies.findOne({ DirectorName: req.params.Name }).select("Director")
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
      if (user) {
        return res.status(400).send(req.body.Username + ' already exists');
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
        })
          .then((user) => { res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error.message);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error.message);
    });
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
  console.log('Listening on Port ' + port);
});