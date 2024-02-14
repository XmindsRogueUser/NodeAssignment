const express = require('express')
const controller1 = require('./route/controller1');
const controller2 = require('./route/controller2');
const app = express()
const port = 3000

// express.static() -> render static resources
app.use(express.static('public'));
// express.json() -> use json parser
app.use(express.json());
app.use('/controller', controller1);
app.use('/controller2', controller2);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

app.get('/static', logger, (req, res) => {
    console.log("static")
    res.render("home.ejs")
});

app.get('/home', logger, (req, res) => {
    console.log("home")
    res.send("Home")
});

function logger(req, res, next) {
    console.log("middleware");
    next();
}