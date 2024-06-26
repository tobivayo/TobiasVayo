import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public getProducts(): Observable<IProduct[]> {
    return this._http.get<IBackProduct[]>(BASE_URL).pipe(
      map( res => this._mapper.productListFromBack(res))
    );
  }

  public getProductById(id: string): Observable<IProduct | undefined> {
    return this._http.get<IBackProduct[]>(BASE_URL).pipe(
      map( res => this._mapper.productListFromBack(res).find(p => p.id === id))
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
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

    return this._http.delete(`${BASE_URL}?id=${id}`, { headers, responseType: 'text'}
  );
  }

  public getIdExists(id: string): Observable<boolean> {
    return this._http.get<boolean>(`${BASE_URL}/verification?id=${id}`)
  }
}
