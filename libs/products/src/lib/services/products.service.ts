import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrlProducts = environment.apiURL + 'products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrlProducts);
  }  
  
  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiUrlProducts, productData);
  }

  getProduct(productId: string): Observable<Product> {
   return this.http.get<Product>(`${this.apiUrlProducts}/${productId}`);
 }

  updateProduct(productData: FormData, productid: string): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrlProducts}/${productid}`, productData);
  }


deleteProduct(productId: string): Observable<any> {
  return this.http.delete<any>(`${this.apiUrlProducts}/${productId}`);
}

getProductsCount(): Observable<number> {
  return this.http
    .get<number>(`${this.apiUrlProducts}/get/count`)
    .pipe(map((objectValue: any) => objectValue.productCount));
}
}
