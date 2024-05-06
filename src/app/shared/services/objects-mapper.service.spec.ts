import { TestBed } from '@angular/core/testing';

import { ObjectsMapperService } from './objects-mapper.service';
import { IBackProduct, IProduct } from '../types/IProduct.model';
import { backProductsMock, productsMock } from '../mocks/Product.mock';

describe('ObjectsMapperService', () => {
  let service: ObjectsMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectsMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should correctly convert an array of IBackProduct to an array of IProduct', () => {
    const backProducts: IBackProduct[] = backProductsMock;
    const products: IProduct[] = productsMock;
  
    const convertedProducts = service.productListFromBack(backProducts);
    expect(convertedProducts.length).toEqual(products.length);
    expect(convertedProducts[0].id).toEqual(products[0].id);
    expect(convertedProducts[0].name).toEqual(products[0].name);
    expect(convertedProducts[0].dateRelease).toEqual(products[0].dateRelease);
    expect(convertedProducts[0].dateRevision).toEqual(products[0].dateRevision);
  });
  
  it('should convert IBackProduct to IProduct with correct actions', () => {
    const backProduct: IBackProduct = backProductsMock[1];

    const product = service.productFromBack(backProduct);

    expect(product.id).toEqual(backProduct.id);
    expect(product.actions!.length).toBe(2);
    expect(product.actions![0].label).toEqual('Edit');
    expect(product.actions![1].label).toEqual('Delete');
    expect(product.actions![0].route).toEqual(`/edit/${backProduct.id}`);
    expect(product.actions![1].data.id).toEqual(backProduct.id);
  });
  
  it('should convert IProduct to IBackProduct', () => {
    const product: IProduct = productsMock[1];
    const expectedProduct: IBackProduct = backProductsMock[1];
  
    const backProduct = service.productToBack(product);

    expect(backProduct.id).toEqual(expectedProduct.id);
    expect(backProduct.name).toEqual(expectedProduct.name);
    expect(backProduct.logo).toEqual(expectedProduct.logo);
    expect(backProduct.date_release).toEqual(expectedProduct.date_release);
    expect(backProduct.date_revision).toEqual(expectedProduct.date_revision);
  });
  
});
