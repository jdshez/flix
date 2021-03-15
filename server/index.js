const express = require('express');
const app = express();
const port = process.env.PORT || 3006;
const bodyParser = require('body-parser');
const scraper = require('./filmScrape');
const db = require('./db');


app.use(bodyParser.json());
app.use(function(req,res,next) {
    res.header("Access-Control-Allow-Origin", "*"); // disables security on localhost
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
})


app.get('/movies', async (req, res) => {
    const movies = await db.getMovies();
    //const movies = 
    res.send(movies);
    // NEW clear table contents 12/11 5PM NOt tested yet copy database table first!!!!!!
    //db.clearTable();
});

app.post('/movies', async (req, res) => {
    console.log(req.body)
    const movieData = await scraper.scrapeMovies(req.body.search)
    // new try 2/12/20
    res.send(movieData);
    /* Disable adding to db as of 4/12/20 while adding more data to scraper
    //need to loop over movieData array
    for (let i=0; i<3; i++) {
      db.insertMovie(movieData[i].title, movieData[i].img, movieData[i].flagsArr[0], movieData[i].flagsArr[1], movieData[i].flagsArr[2], movieData[i].flagsArr[3], movieData[i].flagsArr[4])
    };
    
    console.log(movieData);
    console.log('after post');
    //res.send(movieData);
    console.log('after sending movies');
    */
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})