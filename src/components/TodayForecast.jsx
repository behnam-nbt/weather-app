import React, { useMemo } from 'react';
import styles from './Forecast.module.css';
import { getWeatherIcon } from '../helper/helper';

function TodayForecast({ forecast }) {
    // Memoize today's forecast to avoid unnecessary recalculations
    const todayForecast = useMemo(() => {
        const today = new Date().toLocaleDateString();

        return forecast.list.filter((item) => {
            const forecastDate = new Date(item.dt * 1000).toLocaleDateString();
            return forecastDate === today;
        });
    }, [forecast]);

    return (
        <div className={styles.todayForecastContainer}>
            <h2>Today's Forecast</h2>
            <div className={styles.todayForecastGrid}>
                {todayForecast.map((data, index) => (
                    <div key={index} className={styles.forecastItem}>
                        <p>{new Date(data.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        <img src={getWeatherIcon(data.weather[0].description)} alt={data.weather[0].description} />
                        <p>{data.main.temp.toFixed(0)} °C</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TodayForecast;
