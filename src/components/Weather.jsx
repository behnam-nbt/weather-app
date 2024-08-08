import styles from './Weather.module.css';
import { getWeatherIcon, translateWeatherDescription } from '../helper/helper';
import Loader from './Loader';
import AirConditions from '../components/AirConditions';

function Weather({ weather, loading, error }) {
    const weatherIcon = getWeatherIcon(weather.weather[0].description);

    return (
        <div className={styles.weatherAndConditions}>
            <div className={styles.containerBox}>
                {loading ? <Loader /> : (
                    <>
                        <div>
                            <h2>{weather.name}</h2>
                            <span>{translateWeatherDescription(weather.weather[0].description)}</span>
                            <p>{weather.main.temp.toFixed(0)} °C</p>
                            <h3 style={{display : "inline"}}>Real Feel </h3>
                            <span style={{fontSize : "1.2rem"}}>{weather.main.feels_like.toFixed(0)} °C</span>
                        </div>
                        <div>
                            <img src={weatherIcon} alt={weather.weather[0].main} />
                        </div>
                    </>
                )}
            </div>
            {weather && !error && <AirConditions weather={weather} loading={loading} />}
        </div>
    );
}

export default Weather;
