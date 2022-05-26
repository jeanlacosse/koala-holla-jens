const express = require("express");
const koalaRouter = express.Router();
const pool = require("../modules/pool");

// DB CONNECTION

// GET
koalaRouter.get("/", (req, res) => {
  let sqlQuery = `
    SELECT * FROM koala
    `;
  pool
    .query(sqlQuery)
    .then((response) => {
      console.log(response.rows);
      res.send(response.rows);
    })
    .catch((err) => {
      console.log("error getting koala", err);
      res.sendStatus(500);
    });
});

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

koalaRouter.delete('/:couldBeAnything', (req,res ) => {
    let koalaId = req.params.couldBeAnything
    console.log('In Delete', koalaId);
    const sqlQuery = `
        DELETE FROM "koala"
        WHERE "id" = $1;
        `;
    const sqlParams = [
        koalaId,
    ];

    pool.query(sqlQuery,sqlParams)
        .then(() => {
            console.log('It worked');
            res.sendStatus(204)
        })
        .catch((err) => {
            console.log(`DELETE failed: ${err}`);
            res.sendStatus(500);
        })

})

module.exports = koalaRouter;
