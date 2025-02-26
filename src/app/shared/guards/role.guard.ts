// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };




import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { RoleService } from '@core/role/role.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
    constructor(
        private roleService: RoleService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const expectedRoles: string[] = route.data['expectedRoles'];
      const currentRole = this.roleService.role;

      if (currentRole && expectedRoles.includes(currentRole)) {
        return true;
      } else {
        this.router.navigate(['/unauthorized']);
        return false;
      }
    }
}