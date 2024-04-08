import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { IProduct } from '../../core/models/api-model.interface';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-api-results',
  templateUrl: './api-results.component.html',
  styleUrl: './api-results.component.css'
})
export class ApiResultsComponent implements OnInit {

    constructor(private apiService: ApiService){}

    productsList: IProduct[] | null = [];

    ngOnInit(): void {
        // Get all apis on init
        this.getAllProducts();

        // Subscribe to Search Subject. Triggered with new value
        this.subscribeToApisSearchSubject();

    }

    subscribeToApisSearchSubject(){
        this.apiService.productSearchValue.pipe(
            distinctUntilChanged(),
            debounceTime(750),
            tap((searchValue:string) => {
                // If user has entered a search value, we get apis with specific category
                if(searchValue.trim()){
                    return this.getProductsByTitle();
                }
                // If user has NOT entered a search value, we get all apis
                else {
                    return this.getAllProducts();
                }
            })).subscribe();
    }


    getAllProducts(){
        this.apiService.getProducts().subscribe(response => this.productsList = response);
        
    }


    getProductsByTitle(){
        this.apiService.getProductsByTitle().subscribe(response => this.productsList = response);
    }

}
