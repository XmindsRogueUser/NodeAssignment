const router = require('express').Router();

// Route API
router.get('/error-test', (req, res, next) => {
    requestBody = req.query;
    console.log("API CALLED")
    console.log(requestBody.id)
    if (requestBody.id === undefined) {
        req.er4xx = true;
        next(new Error("Please provide id parameter"))
        return
    }
    if (requestBody.id == 0) {
        next(new Error("Operation not supported"));
        return
    }
    res.status(200).send('SUCCESS!');

})

// JSON 
router.post('/json', (req, res) => {
    requestBody = req.body;
    let str = "Hello " + requestBody.name + "."
    console.log(str);
    res.status(200).send(str);

})

// Handle Internal server error
router.use((err, req, res, next) => {
    console.error("INTERNAL SERVER ERROR")
    res.status(500).send(err.message)
});


// Handle bad data exception
router.use((err, req, res, next) => {
    console.error("BAD DATA")
    if (req.er4xx) {
        res.status(400).send(err.message);
    }
    else {
        next(err);
    }
})

module.exports = router;