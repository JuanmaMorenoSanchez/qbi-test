import { Component, computed, inject, Input } from '@angular/core';
import { signal } from '@angular/core';
import { RangePipe } from '../../../../shared/pipes/range.pipe';
import { RoleOnlyDirective } from '../../../../shared/directives/role-only.directive';
import { RoleEnum } from '../../../../core/role/role.model';
import { ProductService } from '../../../../core/product/product.service';
import { CompanyService } from '../../../../core/company/company.service';
import { SettingsService } from '../../../../core/settings/settings.service';
import { CurrencyPipe } from '../../../../shared/pipes/currency.pipe';

@Component({
  selector: 'app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.scss'],
  imports: [
    RangePipe, 
    CurrencyPipe,
    RoleOnlyDirective
]
})
export class AppTableComponent {
    private productService = inject(ProductService);
    private companyService = inject(CompanyService);
    private settingsService = inject(SettingsService);

    readonly allRoles = RoleEnum;

    @Input({ required: true }) set data(value: any[]) {
        this._data.set(value);
    }
    @Input({ required: true }) dataType: string = "";
       
    get data() {
        return this._data();
    }
    get totalPages() {
        return Math.ceil(this.data.length / this.pageSize());
    }

    private _data = signal<any[]>([]);
    pageSize = signal(this.settingsService.getSettings().selectedPageSize || 20);
    pageIndex = signal(0);
    paginatedData = computed(() => {
        const startIndex = this.pageIndex() * this.pageSize();
        const endIndex = startIndex + this.pageSize();
        return this.data.slice(startIndex, endIndex);
    });
    columns = computed(() => {
        const settings = this.settingsService.getSettings();
        const columnSettings =
          this.dataType === 'product'
            ? settings.productColumnSettings
            : settings.companyColumnSettings;
    
        const visibleColumns = columnSettings?.filter((c) => c.visible).map((c) => c.name);
        return this.data?.length && visibleColumns?.length ? visibleColumns : Object.keys(this.data[0] || []);
      });

    onPageSizeChange(event: Event) {
        const selectElement = event.target as HTMLSelectElement;
        this.pageSize.set(Number(selectElement.value));
        this.pageIndex.set(0);
    }

    goToPage(page: number) {
        this.pageIndex.set(page);
    }

    onDelete(row: any) {
        const id = row['id'];
        if (this.dataType === 'product') {
            this.productService.deleteProduct(id);
        } else if (this.dataType === 'company') {
            this.companyService.deleteCompany(id);
        }
    }
}
