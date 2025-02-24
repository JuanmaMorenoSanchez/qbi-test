import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoreService } from '../store/store.service';
import { Observable, tap } from 'rxjs';
import { Product } from './product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly urlExtension = "product";

  constructor(private http: HttpClient, private store: StoreService) {}

  fetchAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.dataApiUrl+this.urlExtension).pipe(
      tap(products => this.store.set('products', products))
    );
  }

  updateProduct(updatedProduct: Product) {
    this.store.updateItem('products', updatedProduct);
  }

  deleteAllProducts() {
    this.store.remove('products');
  }

  deleteProduct(id: string) {
    this.store.removeItem('products', id);
  }
}
