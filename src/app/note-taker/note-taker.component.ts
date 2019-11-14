import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit {

  errMessage: string;
  notes: Array<Note>;
  note: Note;

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

  addNote() {
    if (this.note.title == null ||  this.note.text == null) {
      this.errMessage = `Title and Text both are required fields`;
    } else {
      this.errMessage = 'Title and Text both are required fields';
      this.noteService.addNote(this.note).subscribe(addedNote => {
      this.notes.push(addedNote);
    },
    error => {
      if (error.status === 404) {
        this.errMessage = error.message;
       }
    }
    );
  }
}


}
