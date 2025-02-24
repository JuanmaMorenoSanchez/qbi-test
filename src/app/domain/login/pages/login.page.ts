import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'login-page',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss']
})
export class LoginPage {
    private router: Router = inject(Router);

    login() {
        this.router.navigate(['/portal/instructions']);
    }
}