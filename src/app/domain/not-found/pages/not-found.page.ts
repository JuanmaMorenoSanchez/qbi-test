import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
    selector: 'not-found-page',
    templateUrl: './not-found.page.html',
    styleUrls: ['./not-found.page.scss']
})
export class NotFoundPage {
    constructor(private location: Location, private router: Router) {}

    goBack() {
        if (window.history.length > 1) {
          this.location.back();
        } else {
          this.router.navigate(['/']);
        }
      }
      
}
