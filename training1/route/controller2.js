const router = require('express').Router();


// Handle bad data exception
router.use((err, req, res, next) => {
    next()
    console.error("BAD DATA")
    if (req.er4xx) {
        res.status(400).send(err.message);
    }
    else {
        next(err);
    }
})

// Handle Internal server error
router.use((err, req, res, next) => {
    console.error("INTERNAL SERVER ERROR")
    res.status(500).send(err.message)
    next()
});


// Route API
router.get('/error-test', (req, res) => {
    requestBody = req.query;
    console.log("API CALLED")
    console.log(requestBody.id)
    if (requestBody.id === undefined) {
        req.er4xx = true;
        throw ("Please provide id parameter")
    }
    if (requestBody.id == 0) {
        throw ("Operation not supported");
    }
    res.status(200).send('SUCCESS!');

})

module.exports = router;