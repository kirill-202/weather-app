export default class WeatherAPI {
    static UNIT_GROUPS = ["us", "uk", "metric", "base"];

    constructor(apiKey) {
        if (!apiKey) {
            throw new Error("API key is required");
        }
        this.baseUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
        this.apiKey = apiKey;
        this.unitGroup = "metric";
    }

    _isValidUnit(unit) {
        return WeatherAPI.UNIT_GROUPS.includes(unit);
    }

    async _fetchData(endpoint, unitGroup) {
        if (!this._isValidUnit(unitGroup)) {
            throw new Error(`The unit "${unitGroup}" is not allowed`);
        }

        const params = new URLSearchParams({ key: this.apiKey, unitGroup });
        const url = `${this.baseUrl}/${endpoint}?${params.toString()}`;

        try {
            const response = await fetch(url, {
                headers: { "Content-Type": "application/json" }
            });

            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error fetching weather data:", error);
            throw new Error(`Request failed for ${url}: ${error.message}`);
        }
    }

    async getByLongLat(lat, long, unitGroup = this.unitGroup) {
        return this._fetchData(`${lat},${long}`, unitGroup);
    }

    async getByCity(city, unitGroup = this.unitGroup) {
        return this._fetchData(city, unitGroup);
    }
}
