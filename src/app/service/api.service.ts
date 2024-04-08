import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, filter, map, of, throwError, toArray } from 'rxjs';
import { IProduct } from '../core/models/api-model.interface';
import { HttpClient } from '@angular/common/http';
import { db } from '../core/data/dummy-data';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }

    // Subject which will be used for handling 'search apis' logic
    productSearchValue: BehaviorSubject<string> = new BehaviorSubject('');

    // API call to get ALL Apis
    getProducts():Observable<IProduct[]>{
        return of(db.products).pipe(catchError(error => throwError(() => error)));
    }

    // API call to get apis by specific Category (depend on our Behavior Subject)
    getProductsByTitle():Observable<IProduct[]> {
        return of(db.products)
        .pipe(
            map(products => products.filter(
                product => product.title.toLowerCase().includes(this.productSearchValue.getValue().toLowerCase()))
            ),
            catchError(error => throwError(() => error))
        )
    }


}
