import WeatherAPI from "./WeatherAPI.js";

const API_KEY = process.env.WEATHER_API_KEY;
const weatherAPI = new WeatherAPI(API_KEY);


const clearButton = document.querySelector("#clear-btn");
const submitButton = document.querySelector("#send-btn");

submitButton.addEventListener("click", () => {
    const formData = getFormData();

    const weatherData = getWeatherData(formData, weatherAPI);
    if (weatherData) {
        handleWeatherData(weatherData);
    } else {
        alert("Failed to fetch weather data. Please try again.");
    }
    
})

async function getWeatherData(formData, weatherAPI) {
    try {
        let weatherData;
        if (formData.city) {
            weatherData = await weatherAPI.getByCity(formData.city, formData.unit);
        } else if (formData.latitude && formData.longitude) {
            weatherData = await weatherAPI.getByLongLat(formData.latitude, formData.longitude, formData.unit);
        } else {
            alert("Please enter either a city OR latitude and longitude.");
            return null;
        }
        return weatherData;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}

function getFormData() {
    const inputFields = document.querySelectorAll("#weather-form input, #weather-form select");
    const formData = {};

    inputFields.forEach((input) => {
        formData[input.id] = input.value;
    });
}


function clearInputFields() {
    const inputFields = document.querySelectorAll("#weather-form input");
    inputFields.forEach((inputField) => {
        inputField.value = "";
    });
}

clearButton.addEventListener("click", clearInputFields);