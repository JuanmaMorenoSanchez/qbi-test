import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StoreService } from '../store/store.service';
import { Observable, of, tap } from 'rxjs';
import { Product } from './product.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private store = inject(StoreService);

  private readonly urlExtension = "product";

  fetchAllProducts(): Observable<Product[]> {
    const cachedProducts = this.store.get('products');
    if (cachedProducts) {
      return of(cachedProducts);
    } else {
      return this.http.get<Product[]>(environment.dataApiUrl+this.urlExtension).pipe(
        tap(products => this.store.set('products', products))
      );
    }
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
