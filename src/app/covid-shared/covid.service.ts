import { Injectable } from '@angular/core';
import { GlobalDataSummary } from '../globalDataModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore} from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireObject, AngularFireList} from '@angular/fire/database';
// import { Http, Headers, RequestOptions, Response, ResponseContentType } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CovidService {

  dateVal: string = "05-02-2020";
  private globalDataUrl = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/" + this.dateVal + ".csv";

  private stateWiseUrl = "https://api.covid19india.org/state_district_wise.json";

  // private stateWiseUrl = "https://api.covid19india.org/raw_data.json";

  private totatlStateUrl = "https://api.covid19india.org/data.json";


  // Bing World Data API

  private bingWorldApi = "https://bing.com/covid/data";


  // World Data Api all

  private worldData = "https://corona.lmao.ninja/v2/all";

  private worldCountriesData = "https://corona.lmao.ninja/v2/countries";


  // productsRef: AngularFireList<any>;
  // idRef: AngularFireObject<any>;
  companies: AngularFireList<any>;
  dateData: string = "04-17-2020";

  constructor(private http: HttpClient, private db: AngularFirestore, private dbs: AngularFireDatabase) {
    this.getAll();
  }

  getAll() {
     this.companies = this.dbs.list('apiDate');
      console.log(" HELP DATA FIRESTORE", this.companies);
  }



  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


   // HttpClient API get() method => Fetch employees list
  getStateWiseData() {
    return this.http.get(this.stateWiseUrl)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getTotalStateData() {
    return this.http.get(this.totatlStateUrl)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


  getBingWorldData() {
    return this.http.get(this.bingWorldApi)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


  getWorldData() {
    return this.http.get(this.worldData)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


  getWorlCountriesdData() {
    return this.http.get(this.worldCountriesData)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


  handleError(handleError: any): import("rxjs").OperatorFunction<Object, any> {
    throw new Error("Method not implemented.");
  }


  getGlobalData() {
    return this.http.get(this.globalDataUrl, {responseType: 'text'}).pipe(
      map(result => {

        const data: GlobalDataSummary [] = [];
        // console.log("get Data", result);
        const rows = result.split('\n');
        const raw = {};
        rows.forEach(row => {
          const cols = row.split(/,(?=\S)/);
          const cs = {
            country : cols[3],
            confirmed : +cols[7],
            deaths: +cols[8],
            recoverd: +cols[9],
            active: +cols[10]
          };
          const temp: GlobalDataSummary = raw[cs.country];
          if (temp) {
            temp.active = cs.active + temp.active;
            temp.confirmed = cs.confirmed + temp.confirmed;
            temp.deaths = cs.deaths + temp.deaths;
            temp.recoverd = cs.recoverd + temp.recoverd;
            raw[cs.country] = temp;
          } else {
            raw[cs.country] = cs;
          }
        });
        console.log("Datas Row Object", raw);
        return Object.values(raw) as GlobalDataSummary [];
      })
    );
  }
}
