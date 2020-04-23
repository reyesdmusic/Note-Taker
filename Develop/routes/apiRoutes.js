
const path = require("path");
const fs = require("fs");
var notesDb = require("../db/db.json");

const DB_DIR = path.resolve(__dirname, "../db");
const outputPath = path.join(DB_DIR, "db.json");

var notesArray = notesDb;

module.exports = function(app) {
  
  app.get("/api/notes", function(req, res) {
   
    res.json(notesDb);
  });

  app.post("/api/notes", function(req, res) {
    
    
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

});
  
});


};
