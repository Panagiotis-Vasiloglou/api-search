import { Component, Input } from '@angular/core';
import { IApi } from '../../core/models/api-model.interface';

@Component({
  selector: 'app-api-card',
  templateUrl: './api-card.component.html',
  styleUrl: './api-card.component.css'
})
export class ApiCardComponent {

    @Input() api: IApi|null = null;

    constructor(){}
}
