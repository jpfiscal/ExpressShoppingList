const express = require("express");
const app = express();
const shopRoutes = require("./routes");
const middleware = require("./middleware");

app.use(express.json());

app.use(middleware.logger);

//apply prefix to every route in shopRoutes
app.use("/items", shopRoutes);

//automatically reroute "/" to "/items"
app.get("/", (req,res)=>{
    res.redirect("/items");
})

app.listen(3000, function() {
    console.log("Server is listening on port 3000");
});

module.exports = app;