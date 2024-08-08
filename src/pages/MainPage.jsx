import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherData } from '../features/weather/weatherSlice';
import { fetchForecastData } from '../features/forecast/forecastSlice';

import styles from './MainPage.module.css';

import Header from '../components/Header';
import Error from '../components/Error';
import Weather from '../components/Weather';
import Forecast from '../components/Forecast';
import TodayForecast from '../components/TodayForecast';
import AirConditions from '../components/AirConditions';
import Footer from '../components/Footer';

function MainPage() {
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { weather, loading } = useSelector(state => state.weather);
    const { forecast } = useSelector(state => state.forecast);
    
    const defaultCity = 'New York';

    useEffect(() => {
        const storedSearch = localStorage.getItem('search');
        if (storedSearch) {
            setSearch(storedSearch);
            dispatch(fetchWeatherData({ city: storedSearch }));
            dispatch(fetchForecastData({ city: storedSearch }));
        } else if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    dispatch(fetchWeatherData({ lat: latitude, lon: longitude }));
                    dispatch(fetchForecastData({ lat: latitude, lon: longitude }));
                },
                (error) => {
                    console.error('Error getting location:', error);
                    dispatch(fetchWeatherData({ city: defaultCity }));
                    dispatch(fetchForecastData({ city: defaultCity }));
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            dispatch(fetchWeatherData({ city: defaultCity }));
            dispatch(fetchForecastData({ city: defaultCity }));
        }
    }, [dispatch]);

    const locationHandler = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    dispatch(fetchWeatherData({ lat: latitude, lon: longitude }));
                    dispatch(fetchForecastData({ lat: latitude, lon: longitude }));
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
        setSearch('');
        localStorage.removeItem('search');
    };

    const handleSearchSubmit = (city) => {
        setSearch(city);
        localStorage.setItem('search', city);
        dispatch(fetchWeatherData({ city }));
        dispatch(fetchForecastData({ city }));
    };

    const closeError = () => {
        setError('');
        const storedSearch = localStorage.getItem('search');
        setSearch(storedSearch || '');
        if (storedSearch) {
            dispatch(fetchWeatherData({ city: storedSearch }));
            dispatch(fetchForecastData({ city: storedSearch }));
        }
    };

    return (
        <div className={styles.weatherContainer}>
            <Header
                search={search}
                setSearch={setSearch}
                dispatch={dispatch}
                locationHandler={locationHandler}
                setError={setError}
                onSearchSubmit={handleSearchSubmit} // Add this prop to handle search submit
            />
            {error && <Error error={error} setError={setError} closeError={closeError} />}
            {weather && !error && <Weather weather={weather} loading={loading} />}
            {forecast && !error && <TodayForecast forecast={forecast} />}
            {forecast && !error && <Forecast forecast={forecast} />}
            {weather && forecast && !error && <Footer />}
        </div>
    );
}

export default MainPage;
