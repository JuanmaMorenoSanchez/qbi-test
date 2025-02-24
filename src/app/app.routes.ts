import { Routes } from '@angular/router';
import { InstructionsPage } from './domain/instructions/pages/instructions.page';
import { LoginPage } from './domain/login/pages/login.page';
import { PortalPage } from './domain/portal/pages/portal.page';

export const routes: Routes = [
    {
        path: 'portal', component: PortalPage, children: [
            { path: 'instructions', component: InstructionsPage }
        ]
    },
    { path: 'login', component: LoginPage },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
