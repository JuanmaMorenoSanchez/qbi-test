import { Pipe, PipeTransform, inject } from '@angular/core';
import { SettingsService } from '@core/settings/settings.service';
import { formatCurrency } from '../utils/currency.utils';

@Pipe({
  name: 'currencyFormat',
  standalone: true,
})
export class CurrencyPipe implements PipeTransform {
  private settingsService = inject(SettingsService);

  transform(value: number | string): string {
    const currency = this.settingsService.getSettings().currency || 'EUR';
    return formatCurrency(value, currency);
  }
}