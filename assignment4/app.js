const express = require('express')
const employeeController = require('./route/employeeController');
const bodyParser = require('body-parser');

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use('/employee', employeeController);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
