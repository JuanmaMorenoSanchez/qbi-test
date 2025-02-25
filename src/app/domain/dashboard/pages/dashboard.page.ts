import { Component, computed, effect, inject, signal } from '@angular/core';
import { ProductService } from '../../../core/product/product.service';
import { CompanyService } from '../../../core/company/company.service';
import { RoleService } from '../../../core/role/role.service';
import { RoleEnum } from '../../../core/role/role.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../core/product/product.model';
import { Company } from '../../../core/company/company.model';

@Component({
    selector: 'dashboard-page',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
    imports: [
        CommonModule, 
        FormsModule
    ]
})
export class DashboardPage {

    private productService = inject(ProductService);
    private companyService = inject(CompanyService);
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

    constructor() {
        this.loadData();
    }
    
    private loadData() {
        this.productService.fetchAllProducts().subscribe(products => {
            this.productData.set(products)
        });
        this.companyService.fetchAllCompanies().subscribe(companies => {
            this.companyData.set(companies)
        });
    }

    onDataSelectionChange(event: Event) {
        const selectElement = event.target as HTMLSelectElement | null;
        if (selectElement) {
          this.selectedType.set(selectElement.value as 'product' | 'company');
        }
    }

}