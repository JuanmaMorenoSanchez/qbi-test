import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RoleEnum } from '@core/role/role.model';
import { RoleService } from '@core/role/role.service';

@Component({
    selector: 'portal-page',
    templateUrl: './portal.page.html',
    styleUrls: ['./portal.page.scss'],
    imports: [RouterOutlet, RouterLink]
})
export class PortalPage {

    readonly allRoles = RoleEnum;

    constructor(
        private roleService: RoleService
    ) {
    }

    get isGuest() {
        return this.roleService.role === this.allRoles.GUEST
    }

    get isUser() {
        return this.roleService.role === this.allRoles.USER
    }

}