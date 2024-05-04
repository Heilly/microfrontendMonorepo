import { Injectable } from '@angular/core';
import { ICommonProduct } from './models/product.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class CoomonsLibService {

  private _products: ICommonProduct[] = [];

  private _channelSource = new BehaviorSubject<number>(0);//si quieres estar atento a lo que se mande tiene que estar subscrito
  channelPayment$ = this._channelSource.asObservable(); // si quieres enviar informacion cuando ocurra algun cambio .next

  sendData(product: ICommonProduct): void {
    this._products.push(product);
    localStorage.setItem('products', JSON.stringify(this._products));
    this._channelSource.next(this._products.length); 
    
    
  }
}
