import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionState } from './store.models';
import { Settings } from '../settings/settings.models';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private state: SessionState = {};
  private stateSubject = new BehaviorSubject<SessionState>({});

  public stateObservable = this.stateSubject.asObservable();

  constructor() {
    this.loadState();
  }

  private loadState() {
    const savedState = localStorage.getItem('app-state');
    if (savedState) {
      this.state = JSON.parse(savedState);
      this.stateSubject.next(this.state);
    }
  }

  private saveState() {
    localStorage.setItem('app-state', JSON.stringify(this.state));
  }

  // type better than any if i have time.
  set(key: keyof SessionState, value: any) {
    this.state[key] = value;
    this.saveState();
    this.stateSubject.next(this.state);
  }

  get(key: keyof SessionState): any {
    return this.state[key] ?? null;
  }

  remove(key: keyof SessionState) {
    delete this.state[key];
    this.saveState();
    this.stateSubject.next(this.state);
  }

  updateItem(key: string, updatedItem: any) {
    const keyAsKey = key as keyof SessionState;
    const items = this.get(keyAsKey);
    const newValue = Array.isArray(items) ? items.map(item => (item.id === updatedItem.id ? updatedItem : item)) : updatedItem;
    this.set(keyAsKey, newValue);
  }
  
  removeItem(key: string, id: string) { //not ready to remove settings
    const keyAsKey = key as keyof SessionState;

    const items = this.get(keyAsKey);
    if (!Array.isArray(items)) return;
  
    const filteredItems = items.filter(item => item.id !== id);
    this.set(keyAsKey, filteredItems);
  }
}
