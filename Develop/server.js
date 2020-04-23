// Dependency 

var express = require("express");

// EXPRESS CONFIGURATION

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Set port#

var PORT = process.env.PORT || 9010;

// ROUTER

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// LISTENER

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
