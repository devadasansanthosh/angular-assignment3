import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;
  notes: Array<Note>;
  errMessage: string;

  constructor(private noteService: NotesService) {
    this.notStartedNotes = [];
    this.startedNotes = [];
    this.completedNotes = [];
    this.notes = [];
  }

  ngOnInit() {
    this.noteService.getNotes().subscribe(res => {
    this.notes = res;
    this.notes.forEach((note) => {
      if (note.state === 'not-started') {
        let notens = new Note();
        notens = note;
        this.notStartedNotes.push(notens);
      }
      if (note.state === 'started') {
        let notens = new Note();
        notens = note;
        this.startedNotes.push(notens);
      }
      if (note.state === 'completed') {
        let notens = new Note();
        notens = note;
        this.completedNotes.push(notens);
      }
    });
    },
    error => {
      this.errMessage = error.message;
    }
    );
}
}
