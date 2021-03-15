/*
var mysql = require('mysql');
var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    //database: "netpicks"
})
con.connect(function(err){
    if(err) throw err;
    console.log("connected!")
})
*/


const typeorm = require('typeorm');

class Movie {
    constructor(id, title, imgURL, flag1URL, flag2URL, flag3URL, flag4URL, flag5URL) {
        this.id = id;
        this.title = title;
        this.imgURL = imgURL;
        this.flag1URL = flag1URL;
        this.flag2URL = flag2URL;
        this.flag3URL = flag3URL;
        this.flag4URL = flag4URL;
        this.flag5URL = flag5URL;
    }
};

const EntitySchema = require("typeorm").EntitySchema;

const MovieSchema = new EntitySchema({
    name: "Movie",
    target: Movie,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        title: {
            type: "varchar"
        },
        imgURL: {
            type: "text"
        },
        flag1URL: {
            type: "text"
        },
        flag2URL: {
            type: "text"
        },
        flag3URL: {
            type: "text"
        },
        flag4URL: {
            type: "text"
        },
        flag5URL: {
            type: "text"
        }
    }
});

async function getConnection() {
    return await typeorm.createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "password",
        database: "movies",
        //synchronize: true,
        //logging: false,
        entities: [
            MovieSchema
        ]
    })
};

async function getMovies() {
    const connection = await getConnection();
    const movieRepo = connection.getRepository(Movie);
    const movies = await movieRepo.find();
    //connection.close(); 17/11
    return movies;
};

async function clearTable() {
    //const connection = await getConnection(); 17/11
    const movieRepo = connection.getRepository(Movie);
    movieRepo.clear()
    connection.close();
}

async function insertMovie(title, imgURL, flag1URL, flag2URL='null', flag3URL='null', flag4URL='null', flag5URL='null') {
    // For above flagURLs=null, need to check why null isnt accepted on db column??
    const connection = await getConnection();
    
    // create
    const movie = new Movie();
    movie.title = title;
    movie.imgURL = imgURL;
    movie.flag1URL = flag1URL; // Possibly check defined first: if (flg1URL) then set it 
    movie.flag2URL = flag2URL;
    movie.flag3URL = flag3URL;
    movie.flag4URL = flag4URL;
    movie.flag5URL = flag5URL;

    // save
    const movieRepo = connection.getRepository(Movie);
    const res = await movieRepo.save(movie);
    console.log('saved', res);

    // return new list
    const allMovies = await movieRepo.find();
    connection.close();
    return allMovies;

};

module.exports = {
    getMovies,
    insertMovie,
    clearTable
}