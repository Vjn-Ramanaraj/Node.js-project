var MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json());

app.listen(9000, () => {

    console.log('Server started on port 9000...');

});

var url = "mongodb://127.0.0.1:27017/";


MongoClient.connect(url, function (err, db) {
    if (err) throw err;


    //Inser a movie
    app.post('/api/movie', (req, res) => {
        var dbo = db.db("MovieDetails");
        var myobj = {
            MID: req.body.MID,
            Title: req.body.Title,
            Year: req.body.Year,
            Runtime: req.body.Runtime,
            Genre: req.body.Genre,
            Director: req.body.Director,
            Writer: req.body.Writer,
            Actors: req.body.Actors,
            Metascore: req.body.Metascore,
            imdbRating: req.body.imdbRating


        };
        dbo.collection("Movies").insertOne(myobj, (err, result) => {
            if (err) throw err;



            res.send(apiResponse(myobj));

            console.log("data inserted");
            console.log(result);
            // res.write("Data inserted \n" + result);
            //db.close();
        });
    });

    //Get all movies
    app.get('/api/movie', (req, res) => {
        var dbo = db.db("MovieDetails");
        dbo.collection("Movies").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);

            res.send(apiResponse(result));

            // db.close();

        });


    });


    // Find by MID
    app.get('/api/mid/:mid', (req, res) => {
        var dbo = db.db("MovieDetails");
        dbo.collection("Movies").find({ MID: req.params.mid }).toArray(function (err, result) {
            if (err) throw err;
            // console.log(result);
            res.send(apiResponse(result));
            // db.close();F
        });
    });


    //Find by Title
    app.get('/api/title/:title', (req, res) => {
        var dbo = db.db("MovieDetails");
        dbo.collection("Movies").find({ Title: req.params.title }).toArray(function (err, result) {
            if (err) throw err;
            // console.log(result);
            res.send(apiResponse(result));
            // db.close();
        });
    });

    // //Find by Year
    app.get('/api/year/:year', (req, res) => {
        var dbo = db.db("MovieDetails");
        dbo.collection("Movies").find({ Year: req.params.year }).toArray(function (err, result) {
            if (err) throw err;
            // console.log(result);
            res.send(apiResponse(result));
            // db.close();
        });
    });

    //Find by Genre
    app.get('/api/genre/:genre', (req, res) => {
        var dbo = db.db("MovieDetails");
        dbo.collection("Movies").find({ Genre: req.params.genre }).toArray(function (err, result) {
            if (err) throw err;
            // console.log(result);
            res.send(apiResponse(result));
            // db.close();
        });
    });



    //Find by Director
    app.get('/api/director/:director', (req, res) => {
        var dbo = db.db("MovieDetails");
        dbo.collection("Movies").find({ Director: req.params.director }).toArray(function (err, result) {
            if (err) throw err;
            // console.log(result);
            res.send(apiResponse(result));
            // db.close();
        });
    });

    //Find by Actor
    app.get('/api/actor/:actor', (req, res) => {
        var dbo = db.db("MovieDetails");
        dbo.collection("Movies").find({ Actor: req.params.actor }).toArray(function (err, result) {
            if (err) throw err;
            // console.log(result);
            res.send(apiResponse(result));
            // db.close();
        });
    })

    //Delete Movie by MID 
    app.delete('/api/delete/:mid', (req, res) => {
        var dbo = db.db("MovieDetails");
        dbo.collection("Movies").deleteOne({ MID: req.params.mid }, function (err, obj) {
            if (err) throw err;
            res.send(apiResponse(obj));
        });
    })

    // Delete Movie by Title
    app.delete('/api/movie/:title', (req, res) => {
        var dbo = db.db("MovieDetails");
        dbo.collection("Movies").deleteOne({ Title: req.params.title }, function (err, obj) {
            if (err) throw err;
            res.send(apiResponse(obj));
        });
    })

    // //Update Movie by MID
    app.put('/api/movie/:mid', (req, res) => {



        var dbo = db.db("MovieDetails");
        var myquery = { MID: req.params.mid };
        var newvalues = {
            $set: {

                Title: req.body.Title,
                Year: req.body.Year,
                Runtime: req.body.Runtime,
                Genre: req.body.Genre,
                Director: req.body.Director,
                Writer: req.body.Writer,
                Actors: req.body.Actors,
                Metascore: req.body.Metascore,
                imdbRating: req.body.imdbRating

            }
        };
        dbo.collection("Movies").updateOne(myquery, newvalues, function (err, obj) {
            if (err) throw err;
            res.send(apiResponse(obj));
            // db.close();
        });
    })




    function apiResponse(results) {

        return JSON.stringify({ "status": 200, "error": null, "response": results });

    };


});
