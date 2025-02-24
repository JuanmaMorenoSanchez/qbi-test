import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionState } from './store.models';

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

  // type better than any.
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

  updateItem(key: 'products' | 'companies', updatedItem: any) {
    const items = this.get(key);
    if (!Array.isArray(items)) return;
  
    const updatedItems = items.map(item => (item.id === updatedItem.id ? updatedItem : item));
    this.set(key, updatedItems);
  }
  
  removeItem(key: 'products' | 'companies', id: string) {
    const items = this.get(key);
    if (!Array.isArray(items)) return;
  
    const filteredItems = items.filter(item => item.id !== id);
    this.set(key, filteredItems);
  }
}
