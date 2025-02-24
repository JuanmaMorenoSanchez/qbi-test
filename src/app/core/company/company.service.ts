import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoreService } from '../store/store.service';
import { Observable, tap } from 'rxjs';
import { Company } from './company.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

    private readonly urlExtension = "company";
  
    constructor(private http: HttpClient, private store: StoreService) {}
  
    fetchAllProducts(): Observable<Company[]> {
      return this.http.get<Company[]>(environment.dataApiUrl+this.urlExtension).pipe(
        tap(products => this.store.set('companies', products))
      );
    }
  
    updateProduct(updatedProduct: Company) {
      this.store.updateItem('companies', updatedProduct);
    }
  
    deleteAllProducts() {
      this.store.remove('companies');
    }
  
    deleteProduct(id: string) {
      this.store.removeItem('companies', id);
    }
}
