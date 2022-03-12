let weatherForm = document.querySelector(".weatherForm")
let apiUrl = "https://api.weatherapi.com/v1/forecast.json?key=ee1a5ff557e347c58be124637221203&days=7&q="
let apiDataContainer = document.querySelector(".apiData")
let loader = document.querySelector(".loader")


weatherForm.addEventListener("submit", (event) => {
    showLoader();
    let userCity = document.querySelector(".city").value;
    let userApiUrl = apiUrl + userCity;

    fetch(userApiUrl)
        .then(response => response.json())
        .then((dataFromApi) => {
            hideLoader();
            // console.log(dataFromApi.current.condition.text)
            let view = "";
            view += `<div class="mainInfo">`

            //////icon
            view += `<div class="icon">`
            view += `<img src ="${dataFromApi.current.condition.icon}" alt="dataFromApi.current.condition.text">`
            view += `</div>`


            //degrees
            view += `<div class="degrees">`
            view += `${dataFromApi.current.temp_c}<span><sup>o</sup>C</span>`
            view += `</div>`

            ///info
            view += `<div class="info">`
            view += `<p>The amount of rainfall: ${dataFromApi.current.precip_mm} mm </p>`
            view += `<p>Humidity: ${dataFromApi.current.humidity} %</p>`
            view += `<p>Wind: ${dataFromApi.current.wind_kph} km/h</p>`
            view += `</div>`


            view += `</div>`

            view += `<div class = "days">`

            dataFromApi.forecast.forecastday.forEach((day) => {
                view += `<div class="day">`
                view += `<div class="date">${day.date}</div>`
                view += `<div class="icon"><img src="${day.day.condition.icon}"></div>`
                view += `<div class="avgTemp">${day.day.avgtemp_c}<span><sup>o</sup>C</span>`
                view += `</div>`
            })

            apiDataContainer.innerHTML = view;
        })


    event.preventDefault();
})


let showLoader = () => {
    loader.style.display = "block";
}

let hideLoader = () => {
    loader.style.display = "none";
}

