import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Product } from '../models/product.model'

const STORE_URL_BASE = 'http://fakestoreapi.com'

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(limit = '12', sort = 'desc' , categories?:string): Observable<Array<Product>> {
    console.log(categories);
    return this.httpClient.get<Array<Product>>(
      `${STORE_URL_BASE}/products${categories?'/category/'+categories:''}?sort=${sort}&limit=${limit}`
    )
  }
  getAllCategories(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(
      `${STORE_URL_BASE}/products/categories`
    )
  }
}
