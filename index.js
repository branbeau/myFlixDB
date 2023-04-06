const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      uuid = require('uuid');

app.use(bodyParser.json());

  const movies = [
    {
      "Title":"Coming to America",
      "Description":"An extremely pampered African prince travels to Queens, New York, and goes undercover to find a wife that he can respect for her intelligence and strong will.",
      "Genre": {
              "name":"Romantic Comedy",
              "description":"A movie or play that deals with love in a light, humorous way."
      },
      "Director": {
              "Name":"John Landis",
              "Bio":"John David Landis (born August 3, 1950)[1] is an American comedy, horror, and fantasy filmmaker and actor. He is best known for the comedy films that he has directed – such as The Kentucky Fried Movie (1977), National Lampoon's Animal House (1978), The Blues Brothers (1980), An American Werewolf in London (1981), Trading Places (1983), Three Amigos (1986), Coming to America (1988) and Beverly Hills Cop III (1994), and for directing Michael Jackson's music videos for Thriller (1983) and Black or White (1991).",
              "BirthYear":1950
      },
      "ImageUrl":"https://en.wikipedia.org/wiki/Coming_to_America#/media/File:ComingtoAmerica1988MoviePoster.jpg",
    },
    {
      
      "Title":"Notebook",
      "Description":"A poor yet passionate young man (Ryan Gosling) falls in love with a rich young woman (Rachel McAdams), giving her a sense of freedom, but they are soon separated because of their social differences.",
      "Genre": {
              "Name":"Romantic Drama",
              "Description":"Romance films, romance movies, or ship films involve romantic love stories recorded in visual media for broadcast in theatres or on television that focus on passion, emotion, and the affectionate romantic involvement of the main characters."
      },
      "Director": {
              "Name":"Nick Cassavetes",
              "Bio":"Nicholas David Rowland Cassavetes (born May 21, 1959)[1] is an American actor, director, and writer. He has directed such films as She's So Lovely (1997), John Q. (2002), The Notebook (2004), Alpha Dog (2006), and My Sister's Keeper (2009). His acting credits include an uncredited role in Husbands (1970)—which was directed by his father, John Cassavetes—as well as roles in the films The Wraith (1986), Face/Off (1997), and Blow (2001).",
              "birthYear": 1959
      },
      "ImageUrl":"https://www.imdb.com/title/tt0332280/mediaviewer/rm1153669376/?ref_=tt_ov_i",
    },
    {
      
      "Title":"Titanic",
      "Description":"A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
      "Genre": {
              "Name":"Romance Drama",
              "Description":"Romance films, romance movies, or ship films involve romantic love stories recorded in visual media for broadcast in theatres or on television that focus on passion, emotion, and the affectionate romantic involvement of the main characters."
      },
      "Director": {
              "name":"James Cameron",
              "bio":"James Francis Cameron CC (born August 16, 1954) is a Canadian filmmaker. A major figure in the post-New Hollywood era, he is considered one of the industry's most innovative filmmakers, regularly pushing the boundaries of cinematic capability with his use of novel technologies.",
              "birthYear":1954
      },
      "ImageUrl":"https://en.wikipedia.org/wiki/Titanic_(1997_film)#/media/File:Titanic_(1997_film)_poster.png",
    },
    {
      
      "Title":"Catch Me If You Can",
      "Description":"Barely 21 yet, Frank is a skilled forger who has passed as a doctor, lawyer and pilot. FBI agent Carl becomes obsessed with tracking down the con man, who only revels in the pursuit.",

      "Genre": {
              "Name":"Crime/Drama",
              "Description":"Crime fiction, detective story, murder mystery, mystery novel, and police novel are terms used to describe narratives that centre on criminal acts and especially on the investigation, either by an amateur or a professional detective, of a crime.",
      },
      "Director": {
              "Name":"Steven Spielberg",
              "Bio":"Steven Allan Spielberg born December 18, 1946) is an American film director, writer and producer.",
              "birthYear":1946
      },
      "ImageUrl":"https://en.wikipedia.org/wiki/Catch_Me_If_You_Can#/media/File:Catch_Me_If_You_Can_2002_movie.jpg",
    },
    {
      
      "Title":"Ray",
      "Description":"",
      "Genre": {
              "Name":"",
              "Description":""
      },
      "Director": {
              "Name":"",
              "Bio":"",
              "birthYear":2000
      },
      "ImageUrl":"",
    },
    {
      
      "Title":"The Pursuit of Happyness",
      "Description":"",
      "Genre": {
              "Name":"",
              "Description":""
      },
      "Director": {
              "Name":"",
              "Bio":"",
              "birthYear":2023 
      },
      "ImageUrl":"",
    },
    {
      
      "Title":"Seven Pounds",
      "Description":"",
      "Genre": {
              "Name":"",
              "Description":""
      },
      "Director": {
              "Name":"",
              "Bio":"",
              "birthYear":2024  
      },
      "ImageUrl":""
    },
    {
      
      "Title":"Crazy Rich Asians",
      "Description":"The story follows a Chinese-American professor who travels to meet her boyfriend's family and is surprised to discover they are among the richest in Singapore.",
      "Genre": {
              "Name":"Romantic Comedy-Drama",
              "Description":"A subgenre of comedy and slice of life fiction, focusing on lighthearted, humorous plot lines centered on romantic ideas, such as how true love is able to surmount most obstacles.",
      },
      "Director": {
              "Name":"Jon M. Chu",
              "Bio":"Jonathan Murray Chu (born November 2, 1979)is an American film director, producer, and screenwriter. He is best known as the director of 2018's Crazy Rich Asians, the first film by a major Hollywood studio to feature a majority cast of Asian descent in a modern setting since The Joy Luck Club in 1993.",
              "birthYear":1979
      },
      "ImageUrl":"https://en.wikipedia.org/wiki/Jon_M._Chu#/media/File:Jon_M._Chu_2013.jpg",
    },
    {
      
      "Title":"Get Out",
      "Description":"Get Out is a 2017 American psychological horror film written, co-produced, and directed by Jordan Peele in his directorial debut. It stars Daniel Kaluuya, Allison Williams, Lil Rel Howery, LaKeith Stanfield, Bradley Whitford, Caleb Landry Jones, Stephen Root, and Catherine Keener. The plot follows a young black man (Kaluuya), who uncovers shocking secrets when he meets the family of his white girlfriend (Williams).",
      "Genre": {
              "Name":"Horror",
              "Description":"Motion picture calculated to cause intense repugnance, fear, or dread."
      },
      "Director": {
              "Name":"Jordan Peele",
              "Bio":"Jordan Haworth Peele (born February 21, 1979) is an American actor, comedian, and filmmaker. He is best known for his film and television work in the comedy and horror genres.[1][2] Peele started his career in sketch comedy before transiting his career as a writer and director of psychological horror and satirical films. In 2017, Peele was included on the annual Time 100 list of the most influential people in the world.",
              "BirthYear":1979
        },
        "ImageUrl":"https://en.wikipedia.org/wiki/Get_Out#/media/File:Get_Out_poster.png",
    },
    {
      
      "Title":"Black Panther",
      "Description":"Black Panther is a 2018 American superhero film based on the Marvel Comics character of the same name. Produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures, it is the 18th film in the Marvel Cinematic Universe (MCU).",
      "Genre": {
              "Name":"Action/Adventure",
              "Description":"Featuring characters involved in exciting and usually dangerous activities and adventures"
      },
      "Director": {
              "Name":"Ryan Coogler",
              "Bio":"Ryan Kyle Coogler (born May 23, 1986)[1] is an American filmmaker. He is a recipient of four NAACP Image Awards, four Black Reel Awards, a Golden Globe Award nomination, and two Academy Award nominations.",
              "BirthYear":1986
      },
      "ImageUrl":"https://en.wikipedia.org/wiki/Black_Panther_(film)#/media/File:Black_Panther_(film)_poster.jpg",
    }
  ];

// READ
// Gets the list of data about ALL movies
app.get('/movies',(req,res) => {
  res.status(200).json(movies);
});

app.get('/movies/:title',(req,res) => {
    const { title } = req.params;
    const movie = movies.find( movie => movie.Title === title);

    if (movie) {
      res.status(200).json(movies);
    } else {
      res.status(400).send('no such movie');
    } 

});

app.get('/movies/genre/:genreName',(req,res) => {
    const { genreName } = req.params;
    const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre;

    if (genre) {
      res.status(200).json(genre);
    } else {
      res.status(400).send('no such genre');
    } 

app.get('/movies/directors/:directorName',(req,res) => {
    const { directorName } = req.params;
    const director = movies.find( movie => movie.Director.Name === directorName ).Director;

    if (director) {
      res.status(200).json(director);
    } else {
      res.status(400).send('no such director')
    } 

});

app.listen(8080, () => 
  console.log('Listening on port 8080'));
