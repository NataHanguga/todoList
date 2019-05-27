import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { CurrentWeather } from '../current-weather';
import { FormControl } from '@angular/forms';
import { CurrentForecast } from '../current-forecast';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {

  myWeather: CurrentWeather;
  customWeather: any;
  city = (document.getElementById('search') as HTMLInputElement);
  q: any;
  forecast: CurrentForecast[] = [];
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    localStorage.getItem('city') === null ? this.q = 'Romma' : this.q = localStorage.getItem('city');
    this.weatherInCity(this.q);
    console.log(this.q);
    this.simpleForecast();
    this.weatherService.getCityName();
  }

  weatherInCity(cityName: string) {
    this.weatherService.getWeather(cityName).subscribe(
      (data) => {
        this.customWeather = new CurrentWeather(data.location.name,
                                                data.current.temp_c,
                                                data.current.condition.icon,
                                                data.current.condition.text
          );
      }
    );
  }

  simpleForecast() {
    // const forecast = [] as CurrentForecast[];
    this.forecast.splice(0, this.forecast.length); // clean array for new weather
    this.weatherService.getForecast(localStorage.getItem('city'), 3).subscribe(
        (data) => {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < data.forecast.forecastday.length; i++) {
            const forecastWeather = new CurrentForecast(
              data.location.name,
              data.forecast.forecastday[i].day.condition.text,
              data.forecast.forecastday[i].day.avgtemp_c,
              data.forecast.forecastday[i].day.maxtemp_c,
              data.forecast.forecastday[i].day.mintemp_c,
              data.forecast.forecastday[i].date,
              data.forecast.forecastday[i].day.condition.icon
            );
            this.forecast.push(forecastWeather);
          }
        }
      );
      }

  searchCity() {
   const city = (document.getElementById('search') as HTMLInputElement).value;
   console.log(city);
   localStorage.setItem('city', city);
   const cityName = (city.length === 0 ? 'London' : city);
   this.weatherInCity(cityName);
  }

  cleanSearch() {
    // tslint:disable-next-line:no-unused-expression
    console.log('clean');
    if (this.city.value.length === 0) {
      window.alert('empty field');
      // return;
    }
    this.city.value = '';

  }
}
