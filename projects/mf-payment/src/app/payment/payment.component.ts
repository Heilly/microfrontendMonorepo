import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICommonProduct } from '@coomons-lib';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrl:'./payment.component.scss'
})
export class PaymentComponent implements OnInit {

  products: ICommonProduct[] = [];

  ngOnInit(): void {
    const productsStorage = localStorage.getItem('products');
    console.log(productsStorage);

    if (productsStorage) {
      this.products = JSON.parse(productsStorage) as ICommonProduct[];
    }
  }
}
