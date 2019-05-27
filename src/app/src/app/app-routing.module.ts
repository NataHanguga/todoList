import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list/todo-list.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast/weather-forecast.component';
import { ForecastComponent } from './weather-forecast/forecast/forecast.component';

const routes: Routes = [
  {path: 'todoList', component: TodoListComponent},
  {path: 'weather', component: WeatherForecastComponent},
  {path: 'fullWeather', component: ForecastComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
