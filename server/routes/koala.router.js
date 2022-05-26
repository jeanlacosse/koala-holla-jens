const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool');

// DB CONNECTION


// GET


// POST
koalaRouter.post('/', (req,res) => {
    let newKoala = req.body;
    console.log('Adding a new koala:', newKoala);

    let queryText = `INSERT INTO "koala"
        ("name", "gender", "age", "ready_to_transfer", "notes")
            VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryText, [newKoala.name, newKoala.gender, newKoala.age, newKoala.readyForTransfer, newKoala.notes])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('Error adding koala at router POST', error);
            res.sendStatus(500);
        });
});

// PUT


// DELETE

module.exports = koalaRouter;