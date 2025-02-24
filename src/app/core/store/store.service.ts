import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionState } from './store.models';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  // Persnally, I would rather use akita or a state management lib

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
}
