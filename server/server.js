const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const koalaRouter = require('./routes/koala.router')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// ROUTES
app.use('/koalas', koalaRouter)

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});


router.put('/:id', (req, res) => {
  // need to change req.body.isRead to be true and not undefined
  console.log('updating koalas', req.params.id, req.body.transfered);
// params = id of this
// body = true
  let koalaId = req.params.id;

  const sqlQuery = `
  UPDATE "koala"
  SET "ready_to_transfer" = $2
  WHERE id = $1;
  `;

  const sqlParams = [
      koalaId, // $1
      req.body.transfered // $2, 
  ]

  pool.query(sqlQuery, sqlParams)
      .then(() => {
          res.sendStatus(200);
      })
      .catch((err) => {
          console.log(`PUT to db failed: ${err}`);
          res.sendStatus(500);
      });
})