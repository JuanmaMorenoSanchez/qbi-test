import { Component, signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from '@core/settings/settings.service';
import { ColumnSettings } from '@core/settings/settings.models';

@Component({
  selector: 'admin-page',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  imports: [CommonModule],
})
export class AdminPage {
  private settingsService = inject(SettingsService);
  private initialSettings = this.settingsService.getSettings();
  public settings = signal(this.initialSettings);
  public pageSizeOptions = [10, 20, 50];
  public currencyOptions: ('EUR' | 'USD')[] = ['EUR', 'USD'];

  saveSettings() {
    this.settingsService.updateSettings(this.settings());
  }

  setPageSize(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.settings.update((s) => ({ ...s, selectedPageSize: Number(selectElement.value) }));
  }  

  isColumnDisabled(column: ColumnSettings, columns: ColumnSettings[]): boolean {
    return !columns ? false : column.visible && columns.filter(c => c.visible).length === 1;
  }  

  toggleColumnVisibility(column: ColumnSettings, columns: ColumnSettings[]) {
    this.settings.update((setting) => {
      const updatedColumns = columns.map((c) =>
        c === column && (columns.filter(col => col.visible).length > 1 || !c.visible)
          ? { ...c, visible: !c.visible }
          : c
      );
      return columns === setting.productColumnSettings
        ? { ...setting, productColumnSettings: updatedColumns }
        : { ...setting, companyColumnSettings: updatedColumns };
    });
  }

  setCurrency(currency: 'EUR' | 'USD') {
    this.settings.update((s) => ({ ...s, currency }));
  }
}
