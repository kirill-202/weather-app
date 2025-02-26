
export async function getWeatherData(formData, weatherAPI) {
    try {
        let weatherData;
        if (formData.city) {
            weatherData = await weatherAPI.getByCity(formData.city, formData.unit);
        } else if (formData.latitude && formData.longitude) {
            weatherData = await weatherAPI.getByLongLat(formData.latitude, formData.longitude, formData.unit);
        } else {
            throw new Error("Please enter either a city OR latitude and longitude.");

        }
        return weatherData;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
}

export function getFormData() {
    const inputFields = document.querySelectorAll("#weather-form input, #weather-form select");
    const formData = {};

    inputFields.forEach((input) => {
        formData[input.id] = input.value;
    });

    return formData;
}

export function clearInputFields() {
    const inputFields = document.querySelectorAll("#weather-form input");
    inputFields.forEach((inputField) => {
        inputField.value = "";
    });
}

export function handleWeatherData(weatherData) {
    const generalInfoElem = document.querySelector(".general-data");
    const weatherElem = document.querySelector(".weather-data");
    generalInfoElem.replaceChildren();
    weatherElem.replaceChildren();

    for (const dataProperty in weatherData) {
        if (["days", "alerts", "stations"].includes(dataProperty)) {
            continue;
        }
        if (dataProperty === "currentConditions") {
            const weatherDetails = weatherData[dataProperty];
            for (const weatherField in weatherDetails) {
                const dataField = document.createElement("div");
                dataField.id = weatherField;
                dataField.textContent = `${weatherField}: ${weatherDetails[weatherField]}`;
                weatherElem.appendChild(dataField);
            }
            continue;
        }
        if (weatherData[dataProperty] == null) {
            continue;
        }
        const dataField = document.createElement("div");
        dataField.id = dataProperty;
        dataField.textContent = `${dataProperty}: ${weatherData[dataProperty]}`;
        generalInfoElem.appendChild(dataField);
    }
}
