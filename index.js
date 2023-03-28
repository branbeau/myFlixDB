const express = require('express');
  app = express(),
  bodyParser = require('body-parser');
  uuid = require('uuid');
  morgan = require('morgan');

app.user(body-Parser.json());

const app = express();

app.use(express.static('public'));

app.use(morgan('common'));


let topMovies = [
  {
    "Title": "Coming to America",
    "Description": "A 1988 American romantic comedy film directed by John Landis and based on a story originally created
     by Eddie Murphy, who also stars in the lead role. The film also co-stars Arsenio Hall, James Earl Jones, Shari
     Headley, and John Amos. The film was released in the United States on June 29, 1988. Eddie Murphy plays Akeem
     Joffer, the crown prince of the fictional African nation of Zamunda, who travels to the United States in the hopes
     of finding a woman he can marry and love for who she is, not for her status or for having been trained to please
     him.",
    "Genre": "Romantic Comedy",
    "Director": "John Landis",
    "Image URL": "https://en.wikipedia.org/wiki/Coming_to_America#/media/File:ComingtoAmerica1988MoviePoster.jpg",
  },
  {
    "title": "Notebook",
  },
  {
    "title": "Imitation of Life",
  }
  {
    "title": "Titanic",
  },
  {
    "title": 'Catch Me If You Can',
  },
  {
    "title: 'Ray',
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
  {
    title: 'Black Panther',
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
app.listen(8080, () => console.log('Server listening on port :8080'))
