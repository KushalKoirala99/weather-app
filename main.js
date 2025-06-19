const searchBar = document.querySelector('#searchBar');

const API_KEY = '3SNK35PV53ZPWKQ4WX4HFVRGV';
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';



searchBar.addEventListener('keypress', (e)=> {
    if(e.key ==='Enter'){
        searchWeather();
    }
});


async function searchWeather(){
    const location = searchBar.value.trim();



try {
const url = `${BASE_URL}/${encodeURIComponent(location)}?unitGroup=metric&key=${API_KEY}&contentType=json`;
const response = await fetch(url);

if(!response.ok){
    throw new Error(`Weather data not found for "${location}"`);
}

const data = await response.json();
console.log(data)
displayWeather(data);
}catch(e){
    console.log(e)
}
}

function displayWeather(data){
}
