import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { WeatherService } from "../weather.service";

@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.css"]
})
export class WeatherComponent implements OnInit {
  public weatherSearchForm!: FormGroup;
  public weatherData: any;

  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.weatherSearchForm = this.formBuilder.group({
      location: [""]
    });

    // Call getWeather method with the default city (London) when the component initializes
    this.getWeather("London");
  }

  getWeather(city: string) {
    this.weatherService.getWeather(city).subscribe(data => {
      this.weatherData = data;
      console.log(this.weatherData);
    });
  }

  onSubmit() {
    const cityName = this.weatherSearchForm.value.location;
    if (cityName) {
      this.getWeather(cityName);
    }
  }
}
