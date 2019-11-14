import { Component } from '@angular/core';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNoteView = true;
  constructor(private routerService: RouterService) { }

  clickEvent(val) {
    if (val === 'false') {
    this.isNoteView = false;
    this.routerService.routeToListView();
    }
    if (val === 'true') {
      this.isNoteView = true;
      this.routerService.routeToNoteView();
      }        
}
}
