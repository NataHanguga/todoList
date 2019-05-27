import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list/todo-list.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast/weather-forecast.component';
import { CustomDatePipe } from './pipes/date.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ForecastComponent } from './weather-forecast/forecast/forecast.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AgmCoreModule } from '@agm/core';
// import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';

// import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    WeatherForecastComponent,
    CustomDatePipe,
    SortPipe,
    ForecastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    GooglePlaceModule,
    // Ng4GeoautocompleteModule,
    // MatGoogleMapsAutocompleteModule,
    AgmCoreModule.forRoot({
      apiKey: '',
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
