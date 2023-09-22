let searchInput = document.querySelector('.form-control')
let currentDay = document.querySelector('#currentDay')
let currentCity = document.querySelector('#currentCity')
let currentText = document.querySelector('#currentText')
let weatherInfos = document.querySelector('#weatherInfos')
let weatherDayTwo = document.querySelector('#weatherDayTwo')
let weatherDayThree = document.querySelector('#weatherDayThree')
let firstDay = document.querySelector('.firstDay')
let secondDay = document.querySelector('.secondDay')

async function addCity(city) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`)
    let finalResponse =await response.json()
    console.log(finalResponse);
    return finalResponse
   
}

function displayData(finalResponse) {
    let forecastArray = finalResponse.forecast.forecastday
    currentDay.innerHTML = getDayOfWeek(forecastArray[0].date)
    currentDay.nextElementSibling.innerHTML = forecastArray[0].date
    currentCity.innerHTML = finalResponse.location.name
    currentCity.nextElementSibling.firstElementChild.innerHTML = finalResponse.current.temp_c+'&#176;C'
    // currentCity.nextElementSibling.lastElementChild.setAttribute('src',finalResponse.current.condition.icon)
    currentText.firstElementChild.innerHTML = finalResponse.current.condition.text
    weatherInfos.lastElementChild.innerHTML = finalResponse.current.wind_kph
    weatherInfos.previousElementSibling.lastElementChild.innerHTML = finalResponse.current.humidity
    weatherInfos.nextElementSibling.lastElementChild.innerHTML = finalResponse.current.wind_dir

    
    for (let i = 0; i < 2; i++) {
        firstDay.innerHTML = getDayOfWeek(forecastArray[1].date)
        weatherDayTwo.firstElementChild.innerHTML = forecastArray[1].day.maxtemp_c+'&#176;C'
        weatherDayTwo.lastElementChild.innerHTML = forecastArray[1].day.mintemp_c+'&#176;'
        weatherDayTwo.nextElementSibling.firstElementChild.innerHTML = forecastArray[1].day.condition.text
        secondDay.innerHTML = getDayOfWeek(forecastArray[2].date)
        weatherDayThree.firstElementChild.innerHTML = forecastArray[2].day.maxtemp_c+'&#176;C'
        weatherDayThree.lastElementChild.innerHTML = forecastArray[2].day.mintemp_c+'&#176;'
        weatherDayThree.nextElementSibling.firstElementChild.innerHTML = forecastArray[2].day.condition.text
  
    }
}

// function displaySecondData(finalResponse) {
//     let forecastArray = finalResponse.forecast.forecastday
//     for (let i = 0; i < 2; i++) {
//         firstDay.innerHTML = getDayOfWeek(forecastArray[1].date)
//         weatherDayTwo.firstElementChild.innerHTML = forecastArray[1].day.maxtemp_c
//         weatherDayTwo.lastElementChild.innerHTML = forecastArray[1].day.mintemp_c
//         weatherDayTwo.nextElementSibling.firstElementChild.innerHTML = forecastArray[1].day.condition.text
//         secondDay.innerHTML = getDayOfWeek(forecastArray[2].date)
//         weatherDayThree.firstElementChild.innerHTML = forecastArray[2].day.maxtemp_c
//         weatherDayThree.lastElementChild.innerHTML = forecastArray[2].day.mintemp_c
//         weatherDayThree.nextElementSibling.firstElementChild.innerHTML = forecastArray[2].day.condition.text
  
//     }
// }

function getDayOfWeek(dateString) {
    let date = new Date(dateString);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

     
    let dayOfWeek = daysOfWeek[date.getDay()];
    return dayOfWeek;
  }
  
searchInput.addEventListener('input' , function () {
            startApp(searchInput.value)
        }
)

async function startApp(city = 'Cairo') {
    let finalResponse=await addCity(city)
    displayData(finalResponse)
    // displaySecondData(finalResponse)
}

startApp()
