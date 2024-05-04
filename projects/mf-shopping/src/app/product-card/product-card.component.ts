import { Component, Input, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProductCard } from '../models/product-card.interface';
import { CoomonsLibService } from '@coomons-lib';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrl:'./product-card.component.scss' 
})
export class ProductCardComponent {

  @Input() product?: IProductCard;

  constructor( private _commonsLibService : CoomonsLibService ) {}

  clickCard(): void {
    this._commonsLibService.sendData({
      name: this.product!.name,
      price: this.product!.price,
    });
  }
}
