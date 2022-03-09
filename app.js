const express = require("express")
const path = require("path");
const db = require('./database');
const app = express();
const port = process.env.PORT || 5000;

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
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/routing'))


// Handling request
app.post('/request', (req, res) => {
    // console.log(req.body)
    let birth = req.body.data.birth
    let city = req.body.data.city
    let degree = req.body.data.degree
    let subjects = req.body.data.subjects;
    let authors = req.body.data.authors;
    // console.log(subjects)
    // console.log(authors)
    // console.log(birth)
    // console.log(degree)
    let sql = `INSERT INTO reader (birth, city, degree) VALUES ("${birth}", "${city}", "${degree}")`;

    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log('record inserted');
        //console.log(result);
        //res.json(result.insertId)
        var name, id;
        id = result.insertId
        //console.log(id)
        subjects.forEach(element => {
            name = element;
            let sql2 = `INSERT INTO subject (subject_name, reader_id) VALUES ("${name}", ${id})`;
            db.query(sql2, (err, result) => { if (err) throw err; })
        });

        authors.forEach(element => {
            name = element;
            let sql3 = `INSERT INTO author (author_name, reader_id) VALUES ("${name}", ${id})`;
            db.query(sql3, (err, result) => {
                if (err) throw err;
                res.header('Content-type', 'text/html');
                res.render('index2', { msg: "succes" });
            })
        });

    });
})
app.get('/get-all-data', (req, res) => {
    const sql1 = 'SELECT * FROM reader'

    db.query(sql1, (err, readers) => {
        if (err) throw err;

        const sql2 = `SELECT * FROM author`;
        db.query(sql2, (err, authors) => {
            if (err) throw err
            const sql3 = `SELECT * FROM subject`;
            db.query(sql3, (err, subjects) => {
                if (err) throw err;
                //console.log({readers, authors, subjects})
                res.render('index3', {readers, authors, subjects})
            })
        })


    })
})

// app.get('/getalldata', (req, res) => {
//     const sql1 = 'SELECT * FROM reader'
//     let record = [{
//         city: '',
//         birth: '',
//         degree: '',
//         subject: [],
//         author: []
//     }];

//     db.query(sql1, (err, result1) => {
//         if (err) throw err;
//         let i = 0;
//         result1.forEach(elem => {
//             let city, birth, degree, subject = [], author = [];
//             city = elem.city;
//             birth = elem.birth;
//             degree = elem.degree;
//             const sql2 = `SELECT * FROM author WHERE reader_id = ${elem.reader_id}`;
//             db.query(sql2, (err, result2) => {
//                 if (err) throw err;
//                 record[i].author = result2
//                 // result2.forEach(elem2 => {
//                 //     author.push(elem2)
//                 // })

//                 //console.log('author',author)

//             })
//             const sql3 = `SELECT * FROM subject WHERE reader_id = ${elem.reader_id}`;
//             db.query(sql3, (err, result3) => {
//                 if (err) throw err;
//                 record[i].author = result3
//                 // result3.forEach(elem3 => {
//                 //     subject.push(elem3)
//                 // })

//                 //console.log('subject',subject)
//             })
//             console.log('subject2', subject)
//             console.log('author2', author)
//             record.push({ city, birth, degree })
//             i++;
//         })
//         console.log(record)
//         res.json(record)
//     })
// })

// Server Setup
app.listen(port, () => {    
    console.log(`server is running at ${port}`);
});
