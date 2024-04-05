import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_PRODUCTS } from '../mock-products';
import { Product } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class MockProductService {
  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(MOCK_PRODUCTS);
  }
}
