import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Product } from '../models/products';
import { HttpCacheService } from './http-cache-service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://localhost:7086';
  constructor(private http: HttpClient, private httpCacheService: HttpCacheService) { }
  getProducts(page: number, pageSize: number): Observable<Product[]> {
    const url = `${this.baseUrl}/getAll?page=${page}&pageSize=${pageSize}`;
    console.log('Requesting products from:', url);
    return this.httpCacheService.get(url).pipe(
      tap(_ => console.log('Products fetched successfully'))
    );
  }
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/add`;
    return this.http.post<Product>(`${url}`, product);
  }

  updateProduct(id: number, product: Product): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  getBlogUrl(): string {
    return `https://localhost:44300`;
  }

}
