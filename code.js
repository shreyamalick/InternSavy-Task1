const inputbox=document.querySelector('.input-box');
const searchbtn=document.getElementById('searchbtn');
const weatherimg=document.querySelector('.weatherimg');
const tempa=document.querySelector('.tempa');
const description=document.querySelector('.description');
const hum=document.getElementById('hum');
const windspeed=document.getElementById('windspeed');
const locationnotfound=document.querySelector('.locationnotfound');
const weatherbody=document.querySelector('.weatherbody');

async function checkweather(city){
    const apikey="2bff6c1242e335212802bdc3b896024e";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const weatherdata=await fetch(`${url}`).then(response=>response.json());

    if(weatherdata.cod===`404`){
        locationnotfound.style.display="flex";
        weatherbody.style.display="none";
        return;
    }

    locationnotfound.style.display="none";
    weatherbody.style.display="flex";
    tempa.innerHTML=`${Math.round(weatherdata.main.temp-273.15)}°C`;
    description.innerHTML=`${weatherdata.weather[0].description}`;
    hum.innerHTML=`${weatherdata.main.humidity}%`;
    windspeed.innerHTML=`${weatherdata.wind.speed}Km/H`;

    switch(weatherdata.weather[0].main){
        case 'Clouds':
            weatherimg.src="cloud.png";
            break;
        case 'Clear':
            weatherimg.src="weather.png";
            break;
        case 'Rain':
            weatherimg.src="rain.png";
            break;
        case 'Mist':
            weatherimg.src="mist.png";
            break;
        case 'Snow':
            weatherimg.src="snow.png";
            break;
    }
}

searchbtn.addEventListener('click',()=>
    {
        checkweather(inputbox.value);
    }
)