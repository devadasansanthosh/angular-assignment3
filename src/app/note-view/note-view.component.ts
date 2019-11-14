import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {

  notes: Array<Note>;
  note: Note;
  errMessage: string;

  constructor(private noteService: NotesService) {
    this.notes = [];
    this.note = new Note();
  }

  ngOnInit() {
    this.noteService.getNotes().subscribe(res => {
    this.notes = res;
    },
    error => {
      this.errMessage = error.message;
    }
    );
}
}
