import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { IApi } from '../../core/models/api-model.interface';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-api-results',
  templateUrl: './api-results.component.html',
  styleUrl: './api-results.component.css'
})
export class ApiResultsComponent implements OnInit {

    constructor(private apiService: ApiService){}

    apisList: IApi[] | null = [];
    apisCount: number = 0;

    ngOnInit(): void {
        // Get all apis on init
        this.getAllApis();

        // Subscribe to Search Subject. Triggered with new value
        this.subscribeToApisSearchSubject();

    }

    subscribeToApisSearchSubject(){
        this.apiService.apiSearchValue.pipe(
            distinctUntilChanged(),
            debounceTime(750),
            tap((searchValue:string) => {
                // If user has entered a search value, we get apis with specific category
                if(searchValue.trim()){
                    return this.getApisByCategory();
                }
                // If user has NOT entered a search value, we get all apis
                else {
                    return this.getAllApis();
                }
            })).subscribe();
    }


    getAllApis(){
        this.apiService.getApis().subscribe(response => {
            this.apisList = response.entries?.slice(0,25); // results could be thousands, so we 'slice' the array
            this.apisCount = response.count;
        });
    }


    getApisByCategory(){
        this.apiService.getApisByCategory().subscribe(response => {
            this.apisList = response.entries?.slice(0,25); // results could be thousands, so we 'slice' the array
            this.apisCount = response.count;
        });
    }

}
