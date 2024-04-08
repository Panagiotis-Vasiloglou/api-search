import { Component, Input } from '@angular/core';
import { IProduct } from '../../core/models/api-model.interface';

@Component({
  selector: 'app-api-card',
  templateUrl: './api-card.component.html',
  styleUrl: './api-card.component.css'
})
export class ApiCardComponent {

    @Input() product: IProduct|null = null;

    constructor(){}
}
