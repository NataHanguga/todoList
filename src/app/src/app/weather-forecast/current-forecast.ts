export class CurrentForecast {
  constructor(
    public cityName: string,
    public description: string,
    public temp: string,
    public tempMax: string,
    public tempMin: string,
    public date: string,
    public img: string
  ) {}
}
