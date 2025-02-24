import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../../../core/role/role.model';
import { RoleService } from '../../../core/role/role.service';

@Component({
    selector: 'login-page',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss']
})
export class LoginPage {

    constructor(
        private roleService: RoleService,
        private router: Router
    ) {}

    login(role: Role) {
        this.roleService.setRole(role);
        this.router.navigate(['/portal/instructions']);
    }
}