import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { CurrentForecast } from '../current-forecast';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  forecast: CurrentForecast[] = [];

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.simpleForecast();
  }

  simpleForecast() {

  this.forecast.splice(0, this.forecast.length); // clean array for new weather
  this.weatherService.getForecast(localStorage.getItem('city'), 5).subscribe(
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
        console.log(this.forecast, data);
      }
    );
  }

}
