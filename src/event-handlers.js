import { getFormData, getWeatherData, clearInputFields, handleWeatherData } from './weather-utils.js';
import WeatherAPI from './weather-api.js';

const API_KEY = process.env.WEATHER_API_KEY;
console.log(`this is my api key ${API_KEY}`);
const weatherAPI = new WeatherAPI(API_KEY);

export function initializeEventListeners() {
    const clearButton = document.querySelector("#clear-btn");
    const submitButton = document.querySelector("#send-btn");

    clearButton.addEventListener("click", clearInputFields);

    submitButton.addEventListener("click", async (event) => {
        event.stopImmediatePropagation();
        const formData = getFormData();
        try { 
            const weatherData = await getWeatherData(formData, weatherAPI);
            handleWeatherData(weatherData);
        } catch (error){
            alert(error.message);
        }
    });
}