import { Injectable } from '@angular/core';
import { IBackProduct, IProduct } from '../types/IProduct.model';
import { ActionType } from '../types/IMenu.model';

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
      dateRevision: product.date_revision,
      actions: [
        {
          label: 'Edit',
          action: () => {},
          icon: 'ph ph-pencil',
          type: ActionType.Navigate,
          route: `/edit/${product.id}` 
        },
        {
          label: 'Delete',
          action: () => {},
          icon: 'ph ph-trash',
          type: ActionType.Delete,
          data: {
            id: product.id,
            name: product.name
          }
        }
      ]
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
