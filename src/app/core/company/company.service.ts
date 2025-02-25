import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StoreService } from '../store/store.service';
import { Observable, of, tap } from 'rxjs';
import { Company } from './company.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
    private http = inject(HttpClient);
    private store = inject(StoreService);

    private readonly urlExtension = "company";
  
    fetchAllCompanies(): Observable<Company[]> {
      const cachedProducts = this.store.get('companies');
      if (cachedProducts) {
        return of(cachedProducts);
      } else {
        return this.http.get<Company[]>(environment.dataApiUrl+this.urlExtension).pipe(
          tap(products => this.store.set('companies', products))
        );
      }
    }
  
    updateCompany(updatedProduct: Company) {
      this.store.updateItem('companies', updatedProduct);
    }
  
    deleteAllCompanies() {
      this.store.remove('companies');
    }
  
    deleteCompany(id: string) {
      this.store.removeItem('companies', id);
    }
}
