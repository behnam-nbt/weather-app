import sun from '/images/sun.png';
import fewClouds from '/images/cloudy-day.png';
import scatteredClouds from '/images/partly-cloudy.png';
import brokenClouds from '/images/cloudy.png';
import overcastClouds from '/images/overcast.png';
import drizzle from '/images/drizzle.png';
import rain from '/images/rain.png';
import thunderstorm from '/images/thunderstorm.png';
import snow from '/images/snow.png';
import mist from '/images/mist.png';

export const getWeatherIcon = (weatherMain) => {
    switch (weatherMain.toLowerCase()) {
        case 'clear':
            return sun;
        case 'few clouds':
            return fewClouds;
        case 'scattered clouds':
            return scatteredClouds;
        case 'broken clouds':
            return brokenClouds;
        case 'overcast clouds':
            return overcastClouds;
        case 'drizzle':
            return drizzle;
        case 'rain':
        case 'sleet':
        case 'freezing rain':
            return rain;
        case 'thunderstorm':
            return thunderstorm;
        case 'snow':
            return snow;
        case 'mist':
        case 'fog':
        case 'haze':
            return mist;
        default:
            return sun; // Fallback icon
    }
};

export function getDayOfWeek(dt) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dt * 1000); // Convert Unix timestamp to JavaScript date
    return days[date.getDay()];
}

export function translateWeatherDescription(description) {
    switch (description.toLowerCase()) {
        case 'clear':
        case 'clear sky':
            return 'Clear';
        case 'few clouds':
            return 'Mostly Sunny';
        case 'scattered clouds':
            return 'Partly Cloudy';
        case 'broken clouds':
            return 'Mostly Cloudy';
        case 'overcast clouds':
            return 'Overcast';
        case 'drizzle':
            return 'Light Rain';
        case 'rain':
            return 'Rain';
        case 'thunderstorm':
            return 'Thunderstorm';
        case 'snow':
            return 'Snow';
        case 'mist':
            return 'Mist';
        default:
            return description; // Fallback description
    }
}