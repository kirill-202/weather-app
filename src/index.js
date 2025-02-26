import './styles.css';
import { initializeEventListeners } from './event-handlers.js';

document.addEventListener("DOMContentLoaded", () => {
    initializeEventListeners();
});


console.log('Weather API Key:', process.env.WEATHER_API_KEY);