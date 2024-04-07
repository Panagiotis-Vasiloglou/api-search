import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent implements OnInit {

    constructor(private apiService: ApiService){}

    ngOnInit(): void {}

    onSearch(event:KeyboardEvent){
        // set correctly to 'HTMLInputElement'
        const target = event.target as HTMLInputElement;
        // notify our stream with new value
        this.apiService.apiSearchValue.next(target.value);
    }
}
