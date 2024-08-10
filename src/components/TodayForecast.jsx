import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/navigation'; // Import Swiper navigation styles
import styles from './Forecast.module.css';
import { getWeatherIcon } from '../helper/helper';
import { getTodayForecast } from '../helper/helper';
import LeftArrow from '/images/left-arrow.png'
import RightArrow from '/images/arrow-right.png'


function TodayForecast({ forecast }) {
    const todayForecast = getTodayForecast(forecast);

    return (
        <div className={styles.todayForecastContainer}>
            <h2>24-hour Forecast</h2>
            <div className={styles.navigationContainer}>
                <button className={`swiper-button-next ${styles.customNext}`}><img src={RightArrow} alt='' /></button>
                <button className={`swiper-button-prev ${styles.customPrev}`}><img src={LeftArrow} alt='' /></button>
            </div>
            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                navigation={{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }}
                modules={[Navigation]}
                pagination={{ clickable: true }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
            >
                {todayForecast.map((data, index) => {
                    const date = new Date(data.dt * 1000);
                    const dateString = date.toLocaleDateString([], { month: '2-digit', day: '2-digit' });
                    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    return (
                        <SwiperSlide key={index}>
                            <div className={styles.todayForecastItem}>
                                <p>{timeString}</p>
                                <img src={getWeatherIcon(data.weather[0].description)} alt={forecast.list[0].weather[0].description} />
                                <p>{data.main.temp.toFixed(0)} °C</p>
                                <p style={{ color: "#b7b7b7", fontSize: "0.9rem" }}>{dateString}</p>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}

export default TodayForecast;
