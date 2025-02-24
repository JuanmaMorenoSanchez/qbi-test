
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
    selector: 'unauthorized-page',
    templateUrl: './unauthorized.page.html',
    styleUrls: ['./unauthorized.page.scss']
})
export class UnAuthorizedPage {

    constructor(private location: Location, private router: Router) {}

    goBack() {
      if (window.history.length > 1) {
        this.location.back();
      } else {
        this.router.navigate(['/']);
      }
    }
}