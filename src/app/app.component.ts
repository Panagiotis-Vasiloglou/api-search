import { Component, OnDestroy } from '@angular/core';
import { ApiService } from './service/api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

    constructor(private apiService: ApiService){}

    title = 'api-search';

    // Close the stream
    ngOnDestroy(): void {
        this.apiService.apiSearchValue.unsubscribe();
    }
}
