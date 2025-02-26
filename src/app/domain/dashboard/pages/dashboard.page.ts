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
import { SettingsService } from '../../../core/settings/settings.service';
import { formatCurrency } from '../../../shared/utils/currency.utils';

@Component({
    selector: 'dashboard-page',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
    imports: [
        CommonModule, 
        FormsModule,
        AppCounterComponent,
        DoughnutChartComponent,
        AppTableComponent,
    ]
})
export class DashboardPage {
    private productService = inject(ProductService);
    private companyService = inject(CompanyService);
    private storeService = inject(StoreService)
    private roleService = inject(RoleService);
    private settingsService = inject(SettingsService);

  
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
        const currency = this.settingsService.getSettings().currency || 'EUR';
        const ranges = [
          { min: 0, max: 150, label: `${formatCurrency(0, currency)} - ${formatCurrency(150, currency)}` },
          { min: 150, max: 300, label: `${formatCurrency(150, currency)} - ${formatCurrency(300, currency)}` },
          { min: 300, max: 500, label: `${formatCurrency(300, currency)} - ${formatCurrency(500, currency)}` },
          { min: 500, max: Infinity, label: `+${formatCurrency(500, currency)}` },
        ];
    
        const grouped: Record<string, number> = {};
        ranges.forEach((range) => {
          grouped[range.label] = 0;
        });
    
        this.productData().forEach((product) => {
          const price = Number(product.price);
          for (const range of ranges) {
            if (price >= range.min && price < range.max) {
              grouped[range.label]++;
              break;
            }
          }
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