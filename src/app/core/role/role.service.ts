import { Injectable, signal } from '@angular/core';
import { Role } from './role.model';
// import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    // private storeService: StoreService
  ) {

  }

  private roleSignal = signal<Role | null>(null);

  get role() {
    return this.roleSignal();
  }

  setRole(role: Role) {
    this.roleSignal.set(role);
    // this.storeService.set('userRole', role)
    console.log("roleSignal ", this.roleSignal())
  }

  unsetRole() {
    
    this.roleSignal.set(null);
  }
}
