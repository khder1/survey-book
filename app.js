const express = require("express")
const path = require("path");
//const db = require('./database');
const app = express();
//const Author = require('./models/Author')
const Reader = require('./models/Reader')
//const Subject = require('./models/Subject')
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
//const DBURL = process.env.MONGO_URL;
// Connect to MongoDB
mongoose
    .connect(
        'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.abdnl.mongodb.net/survey?retryWrites=true&w=majority',
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use(bodyParser.json());

app.use((req, res, next) => {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});


// Set EJS as templating engine
app.set('view engine', 'ejs');

// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
//app.use(express.static(path.join(__dirname, 'public')))

//app.use('/', require('./routes/routing'))

app.get('/', (req, res) => {
    res.render('index4')
})
// Handling request
app.post('/request', (req, res) => {

    // console.log(req.body)

    
    // console.log(subjects)
    // console.log(authors)
    // console.log(birth)
    // console.log(degree)
    const reader = new Reader({
        birth: req.body.birth,
        city: req.body.city,
        author: req.body.author,
        subject: req.body.subject,
        degree: req.body.degree 
    })
    reader.save((err, result) => {
        if (err) throw err;
        console.log(result);
        res.render('index2', { 'msg': 'success' })
    })
})

app.get('/get-all-data', (req, res) => {
    Reader.find({}, (err, readers) => {
        if (err) throw err
        res.render('index3', { readers})
         
        


    })
})



// Server Setup
app.listen(port, () => {
    console.log(`server is running at ${port}`);
});
