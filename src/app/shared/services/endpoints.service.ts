import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IBackProduct, IProduct } from '../types/IProduct.model';
import { ObjectsMapperService } from './objects-mapper.service';

const BASE_URL = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  constructor(private _http: HttpClient, private _mapper: ObjectsMapperService ) { }

  public getProducts(): Observable<any> {
    return this._http.get<any>(BASE_URL).pipe(
      map( res => this._mapper.productListFromBack(res))
    );
  }
  
  public createProduct(product: IProduct): Observable<IProduct> {
    const productMapped = this._mapper.productToBack(product);
    return this._http.post<IBackProduct>(BASE_URL, productMapped).pipe(
      map( res => this._mapper.productFromBack(res))
    );
  }
  
  public updateProduct(product: IProduct): Observable<IProduct> {
    const productMapped = this._mapper.productToBack(product);
    return this._http.put<IBackProduct>(BASE_URL, productMapped).pipe(
      map( res => this._mapper.productFromBack(res))
    );
  }

  public deleteProduct(id: string): Observable<any> {
    return this._http.delete<any>(`${BASE_URL}?id=${id}`);
  }

  public getIdExists(id: string): Observable<boolean> {
    return this._http.get<boolean>(`${BASE_URL}/verification?id=${id}`)
  }
}
