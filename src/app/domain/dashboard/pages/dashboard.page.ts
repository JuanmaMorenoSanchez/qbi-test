import { Component, computed, inject, signal } from '@angular/core';
import { ProductService } from '../../../core/product/product.service';
import { CompanyService } from '../../../core/company/company.service';
import { RoleService } from '../../../core/role/role.service';
import { RoleEnum } from '../../../core/role/role.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../core/product/product.model';
import { Company } from '../../../core/company/company.model';
import { AppCounterComponent } from '../components/app-counter/app-counter.component';
import { DoughnutChartComponent } from '../components/doughnutchart/doughnutchartcomponent';
import { AppTableComponent } from '../components/app-table/app-table.component';
import { StoreService } from '../../../core/store/store.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'dashboard-page',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
    imports: [
        CommonModule, 
        FormsModule,
        AppCounterComponent,
        DoughnutChartComponent,
        AppTableComponent
    ]
})
export class DashboardPage {

    private productService = inject(ProductService);
    private companyService = inject(CompanyService);
    private storeService = inject(StoreService)
    private roleService = inject(RoleService);
  
    public selectedType = signal<'product' | 'company'>('product'); // type better
    private productData = signal<Product[]>([]);
    private companyData = signal<Company[]>([]);

    public isAdmin = computed(() => this.roleService.role === RoleEnum.ADMIN);
    public displayingData = computed(() =>
        this.selectedType() === 'product'
          ? this.productData()
          : this.companyData()
    );
    public countValue = computed(() => this.displayingData().length)
    public chartData = computed(() => {
        if (this.selectedType() === 'product') {
          return this.groupProductPrices();
        } else {
          return this.groupCompaniesBySuffix();
        }
    });

    constructor() {
        this.loadData();
        this.observeDataChanges();
    }
    
    private loadData() {
        this.productService.fetchAllProducts().subscribe(products => {
            this.productData.set(products)
        });
        this.companyService.fetchAllCompanies().subscribe(companies => {
            this.companyData.set(companies)
        });
    }

    private observeDataChanges() {
        this.storeService.stateObservable
            .pipe(takeUntilDestroyed())
            .subscribe(state => {
            this.productData.set(state.products!);
            this.companyData.set(state.companies!);
        })
    }

    onDataSelectionChange(event: Event) {
        const selectElement = event.target as HTMLSelectElement | null;
        if (selectElement) {
          this.selectedType.set(selectElement.value as 'product' | 'company');
        }
    }

    private groupProductPrices(): Record<string, number> {
        const grouped = { '0€ - 150€': 0, '150€ - 300€': 0, '300€ - 500€': 0, '+500€': 0 };
    
        this.productData().forEach(product => {
        const price = Number(product.price)
        if (price < 150) grouped['0€ - 150€']++;
        else if (price < 300) grouped['150€ - 300€']++;
        else if (price < 500) grouped['300€ - 500€']++;
        else grouped['+500€']++;
        });
    
        return grouped;
    }
    
    private groupCompaniesBySuffix(): Record<string, number> {
        const grouped: Record<string, number> = {};
    
        this.companyData().forEach(company => {
        if (!grouped[company.suffix]) {
            grouped[company.suffix] = 0;
        }
        grouped[company.suffix]++;
        });
    
        return grouped;
    }
}