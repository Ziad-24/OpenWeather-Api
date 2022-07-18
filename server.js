// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine' , 'ejs')
app.set('views' , `${__dirname}/views`)


// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// GET and POST callback functions

// get the items inside the projectData object
const getAllData = (req , res) => {
    res.send(projectData);
}


// send items from server side code into the endpoint
const postAllData = (req , res) => {
    projectData = req.body;
    console.log('inside the server the projectdata is ' , projectData);
    res.send(projectData);
}
app.get('/' , (req,res)=>{
    res.render('index')
})
// Get route
app.get('/getData' , getAllData);

// Post route
app.post('/sendData' , postAllData);

// Setup Server

const port = 3000;
const localhost = 'http://127.0.0.1:3000';
const runningServer = () => {
    {console.log(`this project is running on port: ${port} and the localserver is ${localhost}`);}
}

const server = app.listen(port ,runningServer)

