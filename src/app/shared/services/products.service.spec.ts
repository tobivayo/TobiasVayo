import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EndpointsService } from './endpoints.service';
import { AlertService } from './alert.service';
import { of, throwError } from 'rxjs';
import { AlertTypes } from '../types/IAlert.model';
import { IProduct } from '../types/IProduct.model';
import { productsMock } from '../mocks/Product.mock';
import { FormControl, FormGroup } from '@angular/forms';

describe('ProductsService', () => {
  let service: ProductsService;
  let endpointsSpy: jasmine.SpyObj<EndpointsService>;
  let alertSpy: jasmine.SpyObj<AlertService>;

  beforeEach(() => {
    const endpointsMock = jasmine.createSpyObj('EndpointsService', ['getProductById']);
    const alertMock = jasmine.createSpyObj('AlertService', ['showAlert']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: EndpointsService, useValue: endpointsMock },
        { provide: AlertService, useValue: alertMock }
      ]
    });

    service = TestBed.inject(ProductsService);
    endpointsSpy = TestBed.inject(EndpointsService) as jasmine.SpyObj<EndpointsService>;
    alertSpy = TestBed.inject(AlertService) as jasmine.SpyObj<AlertService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch product by ID', async () => {
    const mockProduct: IProduct = productsMock[0];

    endpointsSpy.getProductById.and.returnValue(of(mockProduct));
  
    const product = await service.getProductById('p1');
    expect(product).toEqual(mockProduct);
    expect(endpointsSpy.getProductById).toHaveBeenCalledWith('p1');
  });
  
  it('should handle error when fetching product by ID', async () => {
    endpointsSpy.getProductById.and.returnValue(throwError(() => new Error('Failed to fetch')));
    
    const product = await service.getProductById('p1');
    expect(product).toBeUndefined();
    expect(alertSpy.showAlert).toHaveBeenCalledWith({
      type: AlertTypes.Danger,
      message: 'Ocurrió un error al obtener el producto a editar.'
    });
  });

  it('should generate form config with default values if no product ID is provided', async () => {
    const formConfig = await service.createProductFormConfig();
    expect(formConfig.fields.length).toBeGreaterThan(0);
    expect(formConfig.fields[0].value).toEqual('');
  });
  
  it('should generate form config with product values if product ID is provided', async () => {
    const mockProduct: IProduct = productsMock[0];
    endpointsSpy.getProductById.and.returnValue(of(mockProduct));
  
    const formConfig = await service.createProductFormConfig('p1');
    expect(formConfig.fields.find(f => f.key === 'id')?.value).toEqual('p1');
    expect(formConfig.fields.find(f => f.key === 'name')?.value).toEqual('Product One');
    expect(formConfig.fields.find(f => f.key === 'description')?.value).toEqual('Description of product one.');
    expect(formConfig.fields.find(f => f.key === 'logo')?.value).toEqual('http://example.com/logo1.png');
    expect(formConfig.fields.find(f => f.key === 'dateRelease')?.value).toEqual('2024-01-01');
    expect(formConfig.fields.find(f => f.key === 'dateRevision')?.value).toEqual('2025-01-01');
  });

  it('should extract product data from form controls', () => {
    const formGroup = new FormGroup({
      id: new FormControl('p1'),
      name: new FormControl('Product One'),
      description: new FormControl('Description of Product One'),
      logo: new FormControl('http://example.com/logo1.png'),
      dateRelease: new FormControl(new Date('2024-01-01')),
      dateRevision: new FormControl(new Date('2025-01-01'))
    });
  
    const product = service.getProductFromFormControls(formGroup);
  
    expect(product.id).toEqual('p1');
    expect(product.name).toEqual('Product One');
    expect(product.description).toEqual('Description of Product One');
    expect(product.logo).toEqual('http://example.com/logo1.png');
    expect(product.dateRelease).toEqual(new Date('2024-01-01'));
    expect(product.dateRevision).toEqual(new Date('2025-01-01'));
  });
});
