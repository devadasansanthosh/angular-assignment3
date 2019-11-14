import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../services/router.service';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent implements OnInit {
    noteId: number;
  constructor(public dialog: MatDialog , public activatedRoute: ActivatedRoute, private routerService: RouterService) {

    this.activatedRoute.params.subscribe(params => this.noteId = +params.noteId);
    this.dialog.open(EditNoteViewComponent, {
      data: this.noteId
    }).afterClosed().subscribe(data => {
      this.routerService.routeBack();
    })
    ;
   }

  ngOnInit() {

  }

}
