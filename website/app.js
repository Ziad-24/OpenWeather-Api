// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Global Variables */
// Server
const localhost = 'http://127.0.0.1:3000';
// API
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
let apikey = '&appid=1f40139e06882bfad6e39c22f84bd141&units=imperial';
// button and the values sent from the user
let generate = document.getElementById('generate');
// Error span
let zipError = document.getElementById('error');






// get the data about the weather from the api
const getWeatherData = async (zip) => {
    try{

        let response = await fetch(baseURL+zip+apikey);
        let data = await response.json();
        // if the returned response isnt successful show an error on the screen for a couple of seconds
        if(data.cod != 200)
        {
            zipError.innerHTML = data.message;
            setTimeout(() => {
                zipError.innerHTML = '';
            } , 4000)
        }
        else{
            return data;

        }
        
    } catch(error) {
        console.log(error);
    };    
    
};    


// post method to send data to the server

const postData = async ( url = '', data = {} ) => {
    
    const res = await fetch (url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },    
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });    
    
    try {
        const newData = await res.json();
        
        return newData;
        
    } catch(error) {
        console.log('the error is inside post');
        console.log(error);
    }    
}    

// After getting the data from the API show it on the screen to the client
const ShowUI = async() => {
    const res = await fetch(localhost + '/getData');
    try{
        document.getElementById('results').style.visibility = "visible";
        const data = await res.json();
        document.getElementById('date').innerHTML = `The date is <b>${data.date} </b>`;
        document.getElementById('temp').innerHTML = `The temprature in<b> ${data.name}</b> today is <b>${ Math.round(data.temp)} Degree</b>`;
        if(data.feeling)
            document.getElementById('content').innerHTML = `The user is feeling : <br> <b>${data.feeling}</b>`;
        
    } catch(errors){
        console.log('the error is inside ui');
        console.log(errors);
    }
    
}

// The function that chains all the function together
const Action = () => {

    let zip = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;
    
    getWeatherData(zip).then(data => {
        if(data)
        {
            const cityInfo = {
                name : data.name,
                temp : data.main.temp,
                date : newDate,
                feeling : feelings,
            };    

            postData(`${localhost}/sendData` , cityInfo);

            ShowUI();
        }
    });    
}    

generate.addEventListener('click' , Action);