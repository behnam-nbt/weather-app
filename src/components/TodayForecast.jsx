import React, { useMemo } from 'react';
import styles from './Forecast.module.css';
import { getWeatherIcon } from '../helper/helper';
import { getTodayForecast } from '../helper/helper';

function TodayForecast({ forecast }) {
    const todayForecast = getTodayForecast(forecast);

    return (
        <div className={styles.todayForecastContainer}>
            <h2>Today's Forecast</h2>
            <div className={styles.todayForecastGrid}>
                {todayForecast.map((data, index) => {
                    const date = new Date(data.dt * 1000);
                    const dateString = date.toLocaleDateString([], { month: '2-digit', day: '2-digit' }); // Format date as MM/DD
                    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format time

                    return (
                        <div key={index} className={styles.forecastItem}>
                            <p style={{color : "#b7b7b7"}}>{dateString}</p>
                            <p>{timeString}</p>
                            <img src={getWeatherIcon(data.weather[0].description)} alt={forecast.list[0].weather[0].description} />
                            <p>{data.main.temp.toFixed(0)} °C</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TodayForecast;
