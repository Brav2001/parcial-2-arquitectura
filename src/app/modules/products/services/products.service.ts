import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _http: HttpClient) {}

  public getAllProducts(): Observable<any> {
    return this._http.get<any>('https://api.escuelajs.co/api/v1/products');
  }

  public getProductById(productId: any): Observable<any> {
    return this._http.get<any>(
      'https://api.escuelajs.co/api/v1/products/' + productId
    );
  }

  public updateProduct(productId: any, data: any): Observable<any> {
    return this._http.put<any>(
      'https://api.escuelajs.co/api/v1/products/' + productId,
      data
    );
  }

  public saveProduct(data: any): Observable<any> {
    return this._http.post<any>(
      'https://api.escuelajs.co/api/v1/products/',
      data
    );
  }

  public deleteProduct(value: any): Observable<any> {
    return this._http.delete<any>(
      `https://api.escuelajs.co/api/v1/products/${value.id}`
    );
  }

  //Category
  public getCategories(): Observable<any> {
    return this._http.get<any>('https://api.escuelajs.co/api/v1/categories');
  }
}
