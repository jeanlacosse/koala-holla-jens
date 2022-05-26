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

// PUT

// DELETE

module.exports = koalaRouter;
