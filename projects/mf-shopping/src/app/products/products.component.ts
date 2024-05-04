import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { AnimeService } from '../services/anime.service';
import { inject } from '@angular/core';
import { IProductCard } from '../models/product-card.interface';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  styles: `
  .app {
    border: 3px dashed green;
  }
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(395px, 1fr));
    row-gap: 1em;
    padding: 1em;
}`
})
export class ProductsComponent implements OnInit {
  private _animeService = inject(AnimeService)

  constructor() {}
  products: IProductCard[] = [];

  ngOnInit(): void {
    this._animeService.getAnimes().subscribe((response: any) => {
      this.products = response;
    });
  }
}
