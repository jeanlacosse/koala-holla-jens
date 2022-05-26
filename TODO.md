
setup
    [] pg install, and body-parser
    [] create branch feature
        [] make plan with my pod on how to tackle this
            [] one person per CRUD slice
    [] create a pool.js file
    [] create a CRUD Cake!!
    

sql
    [] create table for koalas - do this together to be on same page
        [] use form create syntax and hard code names in
            [] columns are name, gender, age, ready_to_transfer, notes

server/router
    [] in koala.router.js create router.get,post,delete,put 
        [] these will update the DB via sql

client
    [] create click listener for sublmit btn, run submit function
        [] submit function grabs all the input values into an object
     [] ajax GET, POST, DELETE, PUT - DELETE is stretch
            [] these will send to server.js
        []put will mark ready for tx
            [] need append btn next to name onReady, only if haven't already been marked