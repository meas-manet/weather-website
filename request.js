const key = 'aca0025d25178ce6456c50c28b5186b2';


// const baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=Phnom-Penh&appid=e80945c2532e742c7a37d90a8b89fa00'

// fetch(baseURL).then((data) => { console.log('response',data.json())})
//                 .catch((error) => {
//                     console.log(error);
//                 })

const requestCity =  async (city) => {
    
    const baseURL = 'http://api.openweathermap.org/data/2.5/weather';
    const query = `?q=${city}&appid=${key}`; 
    
    //Fetch cal promise 
    const response =  await fetch(baseURL + query);
    
    //promise data 
    const data = await response.json();
    return data;
}

const requestHourly = async(lat, lon) => {
    const baseURL = 'https://api.openweathermap.org/data/2.5/onecall'
    const query = `?lat=${lat}&lon=${lon}&exclude=minutely,daily&appid=${key}`
    const response = await fetch(baseURL + query);
    const data = await response.json();
    return data;
}

const requestfiveDay = async(lat, lon) => {
    const baseURL = 'https://api.openweathermap.org/data/2.5/forecast'
    const query = `?lat=${lat}&lon=${lon}&appid=${key}`
    const response = await fetch(baseURL + query);
    const data = await response.json();
    return data;
}

const requestCities = async(data) => {
    const temp = await fetch(`https://countries-cities.p.rapidapi.com/location/country/${data}/city/list?page=2&per_page=20&format=json&population=10000`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "countries-cities.p.rapidapi.com",
            "x-rapidapi-key": "4ef68ff66bmsh9f3c02834e002bcp177c62jsne31fd7e09f9a"
        }
    })
    return temp.json();
}
