import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EndpointsService } from './endpoints.service';
import { ObjectsMapperService } from './objects-mapper.service';
import { IBackProduct, IProduct } from '../types/IProduct.model';
import { backProductsMock, productsMock } from '../mocks/Product.mock';

describe('EndpointsService', () => {
  let service: EndpointsService;
  let httpTestingController: HttpTestingController;
  let mapperSpy: jasmine.SpyObj<ObjectsMapperService>;
  const baseUrl = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';
  
  
  beforeEach(() => {
    const mapperMock = jasmine.createSpyObj('ObjectsMapperService', ['productListFromBack', 'productFromBack', 'productToBack']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ObjectsMapperService, useValue: mapperMock }
      ]
    });

    service = TestBed.inject(EndpointsService);
    httpTestingController = TestBed.inject(HttpTestingController);
    mapperSpy = TestBed.inject(ObjectsMapperService) as jasmine.SpyObj<ObjectsMapperService>;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve products and transform them using mapper', () => {
    const mockBackProducts: IBackProduct[] = backProductsMock;
    const mockProducts: IProduct[] = productsMock;
  
    mapperSpy.productListFromBack.and.returnValue(mockProducts);
  
    service.getProducts().subscribe(products => {
      expect(products).toEqual(mockProducts);
      expect(mapperSpy.productListFromBack).toHaveBeenCalledWith(mockBackProducts);
    });
  
    const req = httpTestingController.expectOne(baseUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockBackProducts);
  });

  it('should fetch a single product by ID', () => {
    const mockProducts: IProduct[] = productsMock;
  
    mapperSpy.productListFromBack.and.returnValue(mockProducts);
  
    service.getProductById('p1').subscribe(product => {
      expect(product).toEqual(mockProducts.find(p => p.id === 'p1'));
    });
  
    const req = httpTestingController.expectOne(baseUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockProducts.map((service as any)._mapper.productFromBack));
  });
  
  it('should create a product and return the transformed product', () => {
    const mockProduct: IProduct = productsMock[0];
    const mockBackProduct: IBackProduct = backProductsMock[0];
  
    mapperSpy.productToBack.and.returnValue(mockBackProduct);
    mapperSpy.productFromBack.and.returnValue(mockProduct);
  
    service.createProduct(mockProduct).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });
  
    const req = httpTestingController.expectOne(baseUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockBackProduct);
    req.flush(mockBackProduct);
  });

  it('should update a product and return the transformed product', () => {
    const mockProduct: IProduct = productsMock[0];
    const mockBackProduct: IBackProduct = backProductsMock[0];
  
    mapperSpy.productToBack.and.returnValue(mockBackProduct);
    mapperSpy.productFromBack.and.returnValue(mockProduct);
  
    service.updateProduct(mockProduct).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });
  
    const req = httpTestingController.expectOne(baseUrl);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(mockBackProduct);
    req.flush(mockBackProduct);
  });
  
});
