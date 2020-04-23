// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

const path = require("path");
const fs = require("fs");




var notesDb = require("../db/db.json");

const DB_DIR = path.resolve(__dirname, "../db");
const outputPath = path.join(DB_DIR, "db.json");

var notesArray = notesDb;


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function(req, res) {
    res.json(notesDb);
  });

  

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/notes", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    // let myHardCode = [{"title":"New Title","text":"New text"}];
   
    notesArray.push(req.body);

    
    

    let finalObject = JSON.stringify(notesArray, null, 2);

    fs.writeFile(outputPath, finalObject, function(err){
      if (err) {
        console.log(err);
    } else {
        console.log("Success! You've saved a note!");
    }
});
  
});
 


  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!


};
