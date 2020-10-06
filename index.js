
const searchForm = document.querySelector('.search-location');
const cityValue = document.querySelector('.search-location input')
const cityName = document.querySelector('.city-name p');
const cardBody = document.querySelector('.card-body');
const timeImage = document.querySelector('.card-top img');
const error404 = document.querySelector('.erorr')

const convertKeltoCel = (kelvin) => {
    celcius = Math.round(kelvin - 273.15);
    return celcius;
}
const convertMetretoKM = (Metre) => {
    KM = Math.round(3.6 * Metre);
    return KM;
}

const isDayTime = (icon) => {
    if(icon.includes('d')){
        return true;
    }else{
        return false;
    }
}

updateWeatherApp = (city) => {
    console.log("For Weather: " , city);
    const ImageName = city.weather[0].icon;
    const iconSrc = `http://openweathermap.org/img/wn/${ImageName}@2x.png`;
    cityName.textContent = city.name;
    cardBody.innerHTML = `
            <div class="card-mid row">
            <div class="col-8 text-center temp">
                <span>${convertKeltoCel(city.main.temp)}&deg;C</span>
            </div>
            <div class="col-4 condition-temp">
                <p class="condition">${city.weather[0].description}</p>
                <p class="high">${convertKeltoCel(city.main.temp_max)}&deg;C</p>
                <p class="low">${convertKeltoCel(city.main.temp_min)}&deg;C</p>
            </div>
        </div>

        <div class="icon-container card shadow shadow mx-auto">
            <img src="${iconSrc}" alt="">
        </div>

        <div class="card-buttom px-5 py-4 row">
            <div class="col text-center">
                <p>${convertKeltoCel(city.main.feels_like)}&deg;C</p>
                <span>Feel Like</span>
            </div>
            <div class="col text-center">
                <p>${city.main.humidity}%</p>
                <span>Humidity</span>
            </div>
        </div>    
    `;

    if(isDayTime(ImageName)){
        console.log('Day');
        timeImage.setAttribute('src' , 'img/day_image.svg');
        if(cityName.classList.contains('text-white')){
            cityName.classList.remove('text-white')
        }else{
            cityName.classList.add('text-black')
        }
    }else{
        console.log('Night');
        timeImage.setAttribute('src' , 'img/night_image.svg');
        if(cityName.classList.contains('text-black')){
            cityName.classList.remove('text-black')
        }else{
            cityName.classList.add('text-white')
        }
        
    }
    cardInfo.classList.remove('d-none');
    error404.classList.add('d-none');

    card1.innerHTML = `
        <div class="card-top text-center">
        <div class="Fivecity-name ">
        <p>Tonight</p>
        <span>Jun 30</span>
        </div>
        <div>
        <img src="${iconSrc}" alt="" style="width: 30%;">
        </div>
        <div class="FiveD-Temp">
        <span>${convertKeltoCel(city.main.temp)}&deg;C</span>
        </div>
        <div>
        <p>${city.weather[0].description}</p>
        </div>
    </div>
    `
}


//Add Event Listener
searchForm.addEventListener('submit', e =>{
    e.preventDefault();
    const citySearched = cityValue.value.trim();
    console.log(citySearched);
    searchForm.reset(); 
    requestCity(citySearched)
        .then((data) => {
            if(data.cod == '404'){
                //No Result
                updateError();
            }else{
                updateWeatherApp(data)
            }
        })
        .catch((error) => {console.log(error)})
    requestCity(citySearched)
        .then(data => requestHourly(data.coord.lat, data.coord.lon).then(data=>updateHourly(data)));
    requestCity(citySearched)
        .then(data => requestfiveDay(data.coord.lat , data.coord.lon).then(data => updatefiveDay(data)));
    requestCity(citySearched)
        .then(data => requestCities(data.sys.country).then(data => updateNearby(data)));
})



//Hourly


const cardHourly = document.querySelector('.Hourly-Card') 

updateHourly =(Hourly) => {
    console.log("For Hourly: " , Hourly);
    cardHourly.innerHTML = `
        <div style="padding: 15px;">
        <table class="table table-borderless">
            <thead>
            <tr>
                <th scope="col" style="font-size: 17pt;">HOURLY</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">TODAY</th>
                <td>7pm</td>
                <td>8pm</td>
                <td>9pm</td>
                <td>10pm</td>
                <td>11pm</td>
                <td>12am</td>
            </tr>
            <tr>
                <th scope="row"></th>
                <td><img src="${`http://openweathermap.org/img/wn/${Hourly.hourly[0].weather[0].icon}@2x.png`}" alt=""></td>
                <td><img src="${`http://openweathermap.org/img/wn/${Hourly.hourly[1].weather[0].icon}@2x.png`}" alt=""></td>
                <td><img src="${`http://openweathermap.org/img/wn/${Hourly.hourly[2].weather[0].icon}@2x.png`}" alt=""></td>
                <td><img src="${`http://openweathermap.org/img/wn/${Hourly.hourly[3].weather[0].icon}@2x.png`}" alt=""></td>
                <td><img src="${`http://openweathermap.org/img/wn/${Hourly.hourly[4].weather[0].icon}@2x.png`}" alt=""></td>
                <td><img src="${`http://openweathermap.org/img/wn/${Hourly.hourly[5].weather[0].icon}@2x.png`}" alt=""></td>
            </tr>
            <tr>
                <th scope="row">Forecast</th>
                <td>${Hourly.hourly[0].weather[0].description}</td>
                <td>${Hourly.hourly[1].weather[0].description}</td>
                <td>${Hourly.hourly[2].weather[0].description}</td>
                <td>${Hourly.hourly[3].weather[0].description}</td>
                <td>${Hourly.hourly[4].weather[0].description}</td>
                <td>${Hourly.hourly[5].weather[0].description}</td>
            </tr>
            <tr>
                <th scope="row">Temp (&deg;C)</th>
                <td>${convertKeltoCel(Hourly.hourly[0].temp)}&deg;</td>
                <td>${convertKeltoCel(Hourly.hourly[1].temp)}&deg;</td>
                <td>${convertKeltoCel(Hourly.hourly[2].temp)}&deg;</td>
                <td>${convertKeltoCel(Hourly.hourly[3].temp)}&deg;</td>
                <td>${convertKeltoCel(Hourly.hourly[4].temp)}&deg;</td>
                <td>${convertKeltoCel(Hourly.hourly[5].temp)}&deg;</td>

            </tr>
            <tr>
                <th scope="row">Real Feel</th>
                <td>${convertKeltoCel(Hourly.hourly[0].feels_like)}&deg;</td>
                <td>${convertKeltoCel(Hourly.hourly[1].feels_like)}&deg;</td>
                <td>${convertKeltoCel(Hourly.hourly[2].feels_like)}&deg;</td>
                <td>${convertKeltoCel(Hourly.hourly[3].feels_like)}&deg;</td>
                <td>${convertKeltoCel(Hourly.hourly[4].feels_like)}&deg;</td>
                <td>${convertKeltoCel(Hourly.hourly[5].feels_like)}&deg;</td>


            </tr>
            <tr>
                <th scope="row">Wind (Km/h)</th>
                <td>${convertMetretoKM(Hourly.hourly[0].wind_speed)} Km/h</td>
                <td>${convertMetretoKM(Hourly.hourly[1].wind_speed)} Km/h</td>
                <td>${convertMetretoKM(Hourly.hourly[2].wind_speed)} Km/h</td>
                <td>${convertMetretoKM(Hourly.hourly[3].wind_speed)} Km/h</td>
                <td>${convertMetretoKM(Hourly.hourly[4].wind_speed)} Km/h</td>
                <td>${convertMetretoKM(Hourly.hourly[5].wind_speed)} Km/h</td>
            </tr>
            </tbody>
        </table>
        </div>
    `;
    hourCardInfo.classList.remove('d-none');
    nearbyInfo.classList.remove('d-none');
}


//Nearby Card 
const cardNearby = document.querySelector('.Nearby-Card')
const todaycard = document.querySelector('.Nearby-th-Center')
updateNearby = async (nearby) => {

    // // console.log('For Nearby: ', nearby);
    // let temp = '';

    // for(let i = 0; i < nearby.cities.length; i++) {
    //     // cityResult = await requestCity(city.name)
        
    //     if (i > 5) {
    //         return;
    //     }
    //     result = await requestCity(nearby.cities[i].name)
    //     $('#city').append(`
    //         <div class=" shadow-lg  Nearby-Card">
    //             <div style="padding: 15px;">
    //                 <p>adadasd</p>
    //             </div>
    //         </div>
    //     `) 

    // }

     
    cardNearby.innerHTML = `

            <div style="padding: 15px;">
            <table class="table table-borderless">
            <thead>
                <tr>
                <th scope="col" style="font-size: 17pt;">NEARBY PLACE</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">
                <tr>
                <th>
                    <div>
                    <p>Cities</p>
                    <p>Temp (&deg;C)</p>
                    </div>
                </th>
                <th class="Nearby-th-Center">
                    <div>
                    <p>${nearby.cities[0].name}</p>
                    <p>29&deg;</p>
                    <img src="img/icons8-moon_and_stars.png" alt="">
                    </div>
                </th>
                <th class="Nearby-th-Center">
                    <div>
                    <p>${nearby.cities[1].name}</p>
                    <p>36&deg;</p>
                    <img src="img/icons8-moon_and_stars.png" alt="">
                    </div>
                </th>
                <th class="Nearby-th-Center">
                    <div>
                    <p>${nearby.cities[2].name}</p>
                    <p>36&deg;</p>
                    <img src="img/icons8-moon_and_stars.png" alt="">
                    </div>
                </th>
                <th class="Nearby-th-Center">
                    <div>
                    <p>${nearby.cities[3].name}</p>
                    <p>36&deg;</p>
                    <img src="img/icons8-moon_and_stars.png" alt="">
                    </div>
                </th>
                <th class="Nearby-th-Center">
                    <div>
                    <p>${nearby.cities[4].name}</p>
                    <p>36&deg;</p>
                    <img src="img/icons8-moon_and_stars.png" alt="">
                    </div>
                </th>
                </tr>
                </th>
                </tr>
            </tbody>
            </table>
        </div>
    `
}





//Searched Error

const cardInfo = document.querySelector('.back-card');
const hourCardInfo = document.querySelector('.Hourly-Card');
const nearbyInfo = document.querySelector('.nearby-card');


updateError = () => {
    cardInfo.classList.add('d-none');
    hourCardInfo.classList.add('d-none');
    nearbyInfo.classList.add('d-none');
    var errorIMG = document.createElement('img');
    errorIMG.setAttribute('src' , 'img/error404.png')
    errorIMG.style.width = '50%';
    errorIMG.style.padding = '50px'
    var addHere = document.getElementById('addHere');
    addHere.appendChild(errorIMG);
    
}

//End of Search Error

const card1 = document.querySelector(".card1");
const card2 = document.querySelector(".card2");
const card3 = document.querySelector(".card3");
const card4 = document.querySelector(".card4");
const card5 = document.querySelector(".card5");
updatefiveDay = (five) => {
    const ImageName1 = five.list[1].weather[0].icon
    const iconSrc1 = `http://openweathermap.org/img/wn/${ImageName1}@2x.png`;

    const ImageName2 = five.list[5].weather[0].icon
    const iconSrc2 = `http://openweathermap.org/img/wn/${ImageName2}@2x.png`;

    const ImageName3 = five.list[13].weather[0].icon
    const iconSrc3 = `http://openweathermap.org/img/wn/${ImageName3}@2x.png`;

    const ImageName4 = five.list[21].weather[0].icon
    const iconSrc4 = `http://openweathermap.org/img/wn/${ImageName4}@2x.png`;


    console.log("For Five Day: " , five);
    card2.innerHTML = 
    `
    <div class="card-top text-center">
              <div class="Fivecity-name ">
                <p>Sun</p>
                <span>Jul 01</span>
              </div>
              <div>
                <img src="${iconSrc1}" alt="" style="width: 30%;">
              </div>
              <div class="FiveD-Temp">
                <span>${convertKeltoCel(five.list[1].main.temp)}&deg;C</span>
              </div>
              <div>
                <p>${five.list[1].weather[0].description}</p>
              </div>
            </div>
    `

    card3.innerHTML = 
    `
        <div class="card-top text-center">
        <div class="Fivecity-name ">
        <p>Mon</p>
        <span>Jul 02</span>
        </div>
        <div>
        <img src="${iconSrc2}" alt="" style="width: 30%;">
        </div>
        <div class="FiveD-Temp">
        <span>${convertKeltoCel(five.list[5].main.temp)}&deg;C</span>
        </div>
        <div>
        <p>${five.list[5].weather[0].description}</p>
        </div>
    </div>
    `

    card4.innerHTML = 
    `
        <div class="card-top text-center">
        <div class="Fivecity-name ">
        <p>Tues</p>
        <span>Jul 03</span>
        </div>
        <div>
        <img src="${iconSrc3}" alt="" style="width: 30%;">
        </div>
        <div class="FiveD-Temp">
        <span>${convertKeltoCel(five.list[21].main.temp)}&deg;C</span>
        </div>
        <div>
        <p>${five.list[21].weather[0].description}</p>
        </div>
    </div>
    `

    card5.innerHTML = 
    `
        <div class="card-top text-center">
        <div class="Fivecity-name ">
        <p>Wed</p>
        <span>Jul 04</span>
        </div>
        <div>
        <img src="${iconSrc4}" alt="" style="width: 30%;">
        </div>
        <div class="FiveD-Temp">
        <span>${convertKeltoCel(five.list[21].main.temp)}&deg;C</span>
        </div>
        <div>
        <p>Clear, Warm</p>
        </div>
    </div>
    `
}


//Find Time 
// function fiveDayhour(){
//     // find date 
//     const obj = {
//         dt: 1599033716,
//         id: 2643743,
//         main: {
//           temp: 71.8,
//           feels_like: 66.69,
//           temp_min: 71.01,
//           temp_max: 73,
//           pressure: 1014,
//         },
//         name: "London",
//         sys: {
//           type: 1,
//           id: 1414,
//           country: "GB",
//           sunrise: 1592106173,
//           sunset: 1592165939
//         },
//         timezone: 25200
//       }
//       console.log(new Date(obj.dt*1000-(obj.timezone*1000)))
// }





