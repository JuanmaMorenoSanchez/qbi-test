import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'portal-page',
    templateUrl: './portal.page.html',
    styleUrls: ['./portal.page.scss'],
    imports: [RouterOutlet, RouterLink]
})
export class PortalPage {

}