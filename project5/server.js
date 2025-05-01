// library imports
const express = require('express'); //imports express
const multer = require('multer'); //imports multer to handle file upload
const bodyParser = require('body-parser');//imports body parser to allow us have a body in server request
const nedb = require("@seald-io/nedb")

// app settings
const app = express();

//more variable setups
const urlEncodedParser = bodyParser.urlencoded({ extended: true }); // set up body parser to parse request.body
const upload = multer({ dest: "public/uploads" }); // set up multer location to store files

// database setup
let database = new nedb({ filename: "database.txt", autoload: true })

// middleware setup for express application
app.use(express.static("public"));  // set the default folder for any static files such as assets, css, html
app.use(urlEncodedParser);        // attach body parser to app to parse request.body
app.set("view engine", "ejs"); // attach ejs as templating engine

// default route
app.get("/home", (request, response) => {
    let query = {} // return everything in the db
    database.find(query).exec((err, data) => {
        response.render('home.ejs', { posts: data })
    })
});

app.get("/", (request, response) => {
    let query = {} // return everything in the db
    database.find(query).exec((err, data) => {
        response.render('index.ejs', { posts: data })
    })
});

app.get("/info", (request, response) => {
    let query = {} // return everything in the db
    database.find(query).exec((err, data) => {
        response.render('info.ejs', { posts: data })
    })
});

app.get("/image-expand", (request, response) => {
    let query = {} // return everything in the db
    database.find(query).exec((err, data) => {
        response.render('image-expand.ejs', { posts: data })
    })
});

// route that is attached to the upload form
// uses multer middleware to parse and store image data
app.post("/upload", upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'pdf', maxCount: 1 }
]), (req, res) => {
    let data = {
        userName: req.body.userName,
        Describe: req.body.Describe,
        Headline: req.body.Headline,
        text: req.body.textMessage,
        date: new Date().toLocaleString(),
        timestamp: Date.now(),
        likes: 0
    };

    if (req.files.image1) {
        data.image1 = "/uploads/" + req.files.image1[0].filename;
    }
    if (req.files.image2) {
        data.image2 = "/uploads/" + req.files.image2[0].filename;
    }
    if (req.files.pdf) {
        data.pdf = "/uploads/" + req.files.pdf[0].filename;
    }

    database.insert(data, (err, newData) => {
        res.redirect("/");
    });
});


app.post('/like', (req, res) => {
    let postId = req.body.postId

    let query = {
        _id: postId
    }

    let update = {
        // nedb specific syntax to update a numerical value
        $inc: { likes: 1 }
    }

    database.update(query, update, {}, (err, numUpdated) => {
        res.redirect('back')
    })
})

app.listen(3022, () => {
    // you can access your dev code via one of two URLs you can copy into the browser
    // http://127.0.0.1:3022/
    // http://localhost:3022/
    console.log("server started on port 3022");
});
