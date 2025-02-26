import { Routes } from '@angular/router';
import { InstructionsPage } from '@domain/instructions/pages/instructions.page';
import { LoginPage } from '@domain/login/pages/login.page';
import { PortalPage } from '@domain/portal/pages/portal.page';
import { NotFoundPage } from '@domain/not-found/pages/not-found.page';
import { RoleGuard } from '@shared/guards/role.guard';
import { RoleEnum } from '@core/role/role.model';
import { AdminPage } from '@domain/admin/pages/admin.page';
import { UnAuthorizedPage } from '@domain/unauthorized/pages/unauthorized.page';
import { DashboardPage } from '@domain/dashboard/pages/dashboard.page';

export const routes: Routes = [
    {
        path: 'portal', component: PortalPage, children: [
            { 
                path: 'instructions', 
                component: InstructionsPage,
                canActivate: [RoleGuard],
                data: { expectedRoles: [RoleEnum.ADMIN, RoleEnum.USER, RoleEnum.GUEST] }
            },
            {
                path: 'dashboard',
                component: DashboardPage,
                canActivate: [RoleGuard],
                data: { expectedRoles: [RoleEnum.ADMIN, RoleEnum.USER] }
            },
            {
                path: 'admin',
                component: AdminPage,
                canActivate: [RoleGuard],
                data: { expectedRoles: [RoleEnum.ADMIN] }
            },
        ]
    },
    { path: 'login', component: LoginPage },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'unauthorized', component: UnAuthorizedPage },
    { path: '**', component: NotFoundPage },
];
