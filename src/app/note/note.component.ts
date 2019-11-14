import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../note';
import { RouterService } from '../services/router.service';
import { MatDialog } from '@angular/material';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input()
  note: Note;

  constructor(private routerService: RouterService) { }

  ngOnInit() {
  }

  editNote() {
    this.routerService.routeToEditNoteView(this.note.id);
  }
}
