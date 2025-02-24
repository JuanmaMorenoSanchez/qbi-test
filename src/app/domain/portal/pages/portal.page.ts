import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RoleOnlyDirective } from '../../../shared/directives/role-only.directive';
import { RoleEnum } from '../../../core/role/role.model';

@Component({
    selector: 'portal-page',
    templateUrl: './portal.page.html',
    styleUrls: ['./portal.page.scss'],
    imports: [RouterOutlet, RouterLink, RoleOnlyDirective]
})
export class PortalPage {

    readonly allRoles = RoleEnum;

    // get isAdmin() {

    // }

    // get isUser() {

    // }

    // get userIsAdmin() {

    // }

    

}