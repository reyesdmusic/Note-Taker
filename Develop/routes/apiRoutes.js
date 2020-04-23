//Dependencies


const path = require("path");
const fs = require("fs");
const notesDb = require("../db/db.json");

//Path to local database (/db/db.json)

const DB_DIR = path.resolve(__dirname, "../db");
const outputPath = path.join(DB_DIR, "db.json");

//notesArray is assigned the current entries in the db.json. Posts and deletes will add and take away from this array before re-writing the db.json with the new info.

let notesArray = notesDb;

module.exports = function(app) {

//GET responds with the notes entries array in the database, rendering it in JSON format.
  
  app.get("/api/notes", function(req, res) {
   
    res.json(notesDb);
  });

//POST checks for an empty array and posts a dummy note if it's empty. Then, if the only object in the array is the dummy, it removes it before adding the new post. Then it responds with the new array in JSON format.

  app.post("/api/notes", function(req, res) {
    
    if(notesArray.length === 0){
      notesArray.push( {
        "title": "",
        "text": "",
        "id": 0
      })

    }
    
    if(notesArray[0].title === "") {
      notesArray.shift();
    }
   
    notesArray.push(req.body);

    let finalObject = JSON.stringify(notesArray, null, 2);

    fs.writeFile(outputPath, finalObject, function(err){
      if (err) {
        console.log(err);
    } else {
        console.log("Success! You've saved a note!");
    }
    res.json(finalObject);
});
  
});

//DELETE cycles through array to find given id#, once found it deletes it from the array, writes a new db.json and responds with the new array in json format.
app.delete("/api/notes/:id", function(req, res) {
    
  var chosen = req.params.id;

  console.log(chosen);

  for (var i = 0; i < notesArray.length; i++) {
    if (chosen === notesArray[i].id) {
      notesArray.splice(i, 1);
      
      let finalObject = JSON.stringify(notesArray, null, 2);
      fs.writeFile(outputPath, finalObject, function(err){
        if (err) {
          console.log(err);
      } else {
        res.json(finalObject);
          console.log("Success! You've deleted a note!");
      }

      });

    }
  }
  

});


};
