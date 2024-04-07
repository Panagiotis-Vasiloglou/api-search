import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { IGetApisResponse } from '../core/models/api-model.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }

    // Subject which will be used for handling 'search apis' logic
    apiSearchValue: BehaviorSubject<string> = new BehaviorSubject('');

    apiDomain:string = 'https://api.publicapis.org';


    // API call to get ALL Apis
    getApis():Observable<IGetApisResponse>{
        return this.http.get<IGetApisResponse>(`${this.apiDomain}/entries`)
        .pipe(
            catchError(error => throwError(() => error))
        )
    }

    // API call to get apis by specific Category (depend on our Behavior Subject)
    getApisByCategory():Observable<IGetApisResponse> {
        return this.http.get<IGetApisResponse>(`${this.apiDomain}/entries`, {params: {category: this.apiSearchValue.getValue()}})
        .pipe(
            catchError(error => throwError(() => error))
        )
    }


}
