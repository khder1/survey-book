const express = require('express');
const { route } = require('express/lib/application');
const mysql = require('mysql');
var db = require('../database');
const router = express.Router();




//home page
router.route('/').get((req, res) => {
    res.render('index')
})
// Create DB
router.route('/createdb').get((req, res) => {

    // Connect
    db.connect((err) => {
        if (err) {
            console.log('err = ', err)
            throw err;
        }
        console.log('MySql Connected...');
    });

    let sql = 'CREATE DATABASE survey character set UTF8 collate utf8_general_ci';
    // 

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created...');
    });
    // db.destroy();
});


// Create info table
router.route('/createreadertable').get((req, res) => {

    let readerTableSql = 'CREATE TABLE reader(reader_id int AUTO_INCREMENT, birth  DATE NOT NULL, city VARCHAR(255), degree VARCHAR(255), PRIMARY KEY(reader_id));'

    db.query(readerTableSql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('reader table created...');
    });

});


// Create subject table
router.route('/createsubjecttable').get((req, res) => {

    let subjectTableSql = 'CREATE TABLE subject(subject_id int AUTO_INCREMENT, subject_name VARCHAR(255), reader_id int, PRIMARY KEY(subject_id),  FOREIGN KEY (reader_id) REFERENCES reader(reader_id));'


    db.query(subjectTableSql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('subject table created...');
    });

    // db.destroy();
});


// Create table
router.route('/createauthortable').get((req, res) => {

    let authorTableSql = 'CREATE TABLE author(author_id int AUTO_INCREMENT, author_name VARCHAR(255), reader_id int,  PRIMARY KEY(author_id), FOREIGN KEY (reader_id) REFERENCES reader(reader_id));'
    db.query(authorTableSql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('author table created...');
    });

});


//
// router.route('/').get((req, res) => {
//     res.render('index2');
// })
router.post('/send',  (req, res, next) => {
    console.log("I in contact-us")
    console.log(req.body)
    let birth = req.body.birth
    let city = req.body.city
    var sql = `INSERT INTO reader (BirthdayDate, city) VALUES (${birth}, "${city}")`;
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log('record inserted');
        console.log(result);
        res.redirect('/');
    });
});

// Insert survey
// router.route('/send').post((req, res) => {

//     console.log(req.body)
//     let readerData = {
//         birth: req.body.birth,
//         city: req.body.city,
//         degree: req.body.degree
//     };
//     console.log(readerData)
//     let sql = `INSERT INTO reader (birth, city, degree) VALUES (${readerData.birth}, ${readerData.city}, ${readerData.degree})`;
//     db.query(sql, (err, readerres) => {
//         if (err) throw err;
//         console.log(`readerres = ${readerres} `);
//         res.render('index2', { readerres })
//     });

// });


// Select posts
router.route('/getposts').get((req, res) => {
    // Create connection
    let db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        charset: 'utf8_general_ci',
        database: 'survey'
    });


    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send('Posts fetched...');
    });
    // db.destroy()
});

// Select single post
router.route('/getpost/:id').get((req, res) => {
    // Create connection
    let db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        charset: 'utf8_general_ci',
        database: 'survey'
    });


    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post fetched...');
    });
    // db.destroy()
});

// Update post
router.route('/updatepost/:id').get((req, res) => {


    let newTitle = 'Updated Title';
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post updated...');
    });
    //  db.destroy()
});

// Delete post
router.route('/deletepost/:id').get((req, res) => {

    let newTitle = 'Updated Title';
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post deleted...');
    });
    // db.destroy()
});

module.exports = router