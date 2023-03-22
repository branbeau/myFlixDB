const express = require('express');
  morgan = require('morgan');

const app = express();

app.use(express.static('public'));

app.use(morgan('common'));


let topMovies = [
  {
    title: 'Coming to America',
  },
  {
    title: 'Notebook',
  },
  {
    title: 'Imitation of Life',
  }
  {
    title: 'Titanic',
  },
  {
    title: 'Catch Me If You Can',
  },
  {
    title: 'Ray',
  },
  {
    title: 'The Pursuit of Happyness',
  },
  {
    title: 'Seven Pounds',
  },
  {
    title: 'Crazy Rich Asians',
  },
  {
    title: 'Get Out',
  },
];


// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my movie club!');
});

app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.get('/movies', passport.authenticate('jwt',{session:false}), (req, res) => {
  Movies.find({ Movies: req.params.Movies })
    .then((movies) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Port 8080 listen request
app.listen(8080, () => {
  console.log('Server listening on port :8080');
});
