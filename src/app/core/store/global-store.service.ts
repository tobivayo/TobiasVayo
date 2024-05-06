import { Injectable } from '@angular/core';
import { Store } from '../base/store';
import { GlobalStoreState } from './global-store.state';
import { IProduct } from '../../shared/types/IProduct.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalStoreService extends Store<GlobalStoreState> {

  constructor() { 
    super(new GlobalStoreState());
  }

  updateProducts(newProducts: IProduct[]) {
    this.setState({
      ...this.currentStateValue,
      products: newProducts
    });
  }

  removeProductById(id: string) {
    this.setState({
     ...this.currentStateValue,
      products: this.currentStateValue.products.filter(p => p.id!= id)
    });
  }
}
