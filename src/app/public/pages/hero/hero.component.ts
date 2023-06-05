import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {LayoutService} from "src/app/shared/services/layout/layout.service";


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  constructor(public layoutService: LayoutService, public router: Router) {
  }
  navigateToHighlights() {
    console.log('dddd')
    this.router.navigate(['/public/rca'], { fragment: 'highlights' });
  }

}
