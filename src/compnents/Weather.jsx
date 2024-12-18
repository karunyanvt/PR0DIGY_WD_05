import React, { useEffect, useRef, useState } from 'react';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

const API_KEY=import.meta.env.VITE_API_KEY


const Weather = () => {
    
    const inputref=useRef(null);

    const [weatherData,setWeatherData] =useState(false);

    const allIcons={
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "010d": rain_icon,
        "010n": rain_icon,
        "013d": snow_icon,
        "013n": snow_icon,
    }

    const search = async (location) => {
        if(location === ""){
            alert("Enter the city name")
            return;
        }
        const url= `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
        
        try{
            const response= await fetch(url);
            const data= await response.json();
            if(!response.ok){
                alert(data.message)
                return;
            }
            // console.log(data);
            const icon=allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData(
                {
                    temperature : Math.floor(data.main.temp),
                    location : location,
                    humidity : data.main.humidity,
                    wind_speed : data.wind.speed,
                    icon : icon
                }
            )
        }
        catch(e){
            setWeatherData(false);
            console.error("Error Cannot fetch data");
        }
    }

    useEffect(() => {
        search("tamilnadu")
    },[]);

  return (
    <div className="w-full md:w-3/12  bg-gradient-to-br from-violet-500 via-violet-700 to-indigo-500 rounded-2xl flex flex-col p-7 shadow-lg">
      <div className="flex justify-between items-center mb-5">
        <input 
          ref={inputref}
          type="text" 
          placeholder="Search" 
          className="w-full font-poppins p-2 pl-4 rounded-3xl bg-white text-gray-800 outline-none shadow-sm focus:ring-2 focus:ring-violet-600"
        />
        <img 
          src={search_icon} 
          alt="Search Icon" 
          className="p-2 ml-3 cursor-pointer hover:scale-105 transition-transform bg-white rounded-full" onClick={() => search(inputref.current.value)}
        />
      </div>

      {weatherData ? <>
        <div className="flex flex-col justify-center items-center my-5">
        <img src={weatherData.icon} alt="Weather Icon" className="w-20 h-20" />
        <h1 className='text-6xl text-white'>{weatherData.temperature}°c</h1>
        <h2 className='text-2xl text-white'>{weatherData.location}</h2>
      </div>

      <div className="mt-5 flex justify-around">
        <div className='flex gap-3'>
            <img src={humidity_icon} alt="" className='size-6 mt-3'/>
            <div>
                <p className='text-lg text-white'>{weatherData.humidity} %</p>
                <p className='text-sm text-white'>Humidity</p>
            </div>
        </div>
        <div className='flex gap-3'>
            <img src={wind_icon} alt="" className='size-6 mt-3' />
            <div>
                <p className='text-lg text-white'>{weatherData.wind_speed} Km/h</p>
                <p className='text-sm text-white'>Wind Speed</p>
            </div>
        </div>
      </div></> : <></>}
    </div>
  );
};

export default Weather;
