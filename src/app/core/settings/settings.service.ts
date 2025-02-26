import { inject, Injectable } from '@angular/core';
import { StoreService } from '../store/store.service';
import { Settings } from './settings.models';
import { defaultSettings } from './settings.constants';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private store = inject(StoreService);

  getSettings(): Settings {
    const cachedSettings = this.store.get('settings');
    if (!cachedSettings) {
        this.updateSettings(defaultSettings);
    }
    return cachedSettings || defaultSettings
  }

  updateSettings(settings: Settings) {
    this.store.updateItem('settings', settings);
  }
}