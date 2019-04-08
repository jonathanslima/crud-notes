const express = require('express');
const bodyParser = require('body-parser');
const app = express();


/*/ parse requests of content-type - application/x-www-form-urlencoded*/
app.use(bodyParser.urlencoded({ extended: true }))
/*/ parse requests of content-type - application/json*/
app.use(bodyParser.json())

const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

/*/ Requires */
// require('./app/routes/node.routes.js')(app);



/*/ Connecting to the database*/
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

/*/ define a simple route*/
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

    const notes = require('./app/controllers/note.controller.js');

    // Create a new Note
    app.post('/notes', notes.create);

    // Retrieve all Notes
    app.get('/notes', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', notes.delete);

/*/ listen for requests*/
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});