// 1. library imports
const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')

// 2. app settings
const app = express()
const encodedParser = bodyParser.urlencoded({extended: true})
const path = require('path');
const up = multer({ dest: path.join(__dirname, "public/upload") });

app.use(express.static('public')) // setting the static file location to be public (css, front-end js, assets like images)
app.use(encodedParser) // allows express to parse the body of the request (req.body)
app.set("view engine", "ejs") // allows us to use ejs, specifically with render

let myPostArray = []

// 3. routes
app.get('/', (req, res)=>{
    res.render('index.ejs', {allPosts: myPostArray})
})

app.get('/home', (req, res) => {
    res.render('home', { allPosts: myPostArray });
});

app.get('/info', (req, res) => {
    res.render('info', { allPosts: myPostArray });
});


app.post('/upload', up.single("theimage"), (req, res)=>{
    let now = new Date()

    // local temporary post obj that determines the structure of each element in the array
    let post = {
        userName: req.body.userName,
        text: req.body.textMessage,
    }
    // check if file exists
    if(req.file){
        // add the img location to the post object
        post.imgUrl = "upload/" + req.file.filename
    }

    // adds to the front of the array so the posts will go in order from newest to oldest
    myPostArray.unshift(post)
    // redirect back to the home pages
    res.redirect('/')
})

// 4. listener
app.listen(3000, ()=>{
    console.log('server is live at http://127.0.0.1:3000')
})
