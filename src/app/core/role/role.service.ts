import { Injectable } from '@angular/core';
import { Role } from './role.model';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private storeService: StoreService
  ) {
  }

  get role() {
    return this.storeService.get('userRole')
  }

  setRole(role: Role) {
    this.storeService.set('userRole', role);
  }

  unsetRole() {
    this.storeService.remove('userRole');
  }
}
