import { Injectable } from '@angular/core';
import { IBackProduct, IProduct } from '../types/IProduct.model';

@Injectable({
  providedIn: 'root'
})
export class ObjectsMapperService {

  constructor() { }

  public productListFromBack(products: IBackProduct[]): IProduct[] {
    return products.map(product => this.productFromBack(product));
  }

  public productFromBack(product: IBackProduct): IProduct {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      logo: product.logo,
      dateRelease: product.date_release,
      dateRevision: product.date_revision
    };
  }

  public productToBack(product: IProduct): IBackProduct {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      logo: product.logo,
      date_release: product.dateRelease,
      date_revision: product.dateRevision
    };
  }
}
