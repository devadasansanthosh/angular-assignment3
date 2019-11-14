import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;
  noteForm: FormGroup;
  title = new FormControl();
  text = new FormControl();
  
  @ViewChild(FormGroupDirective)
  formGroupDirective: FormGroupDirective;
  constructor(private notesService: NotesService, private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA)public data: number, public dialogRef: MatDialogRef<EditNoteViewComponent>) {
      this.note = this.notesService.getNoteById(this.data);
      this.noteForm = this.formBuilder.group({
      title: new FormControl(this.note.title, Validators.compose([Validators.required, Validators.minLength(5)])),
      text:  new FormControl(this.note.text, Validators.compose([Validators.required, Validators.minLength(5)]))
      });

  }

  ngOnInit() {
  }

  editSaveNote(noteForm: FormGroup) {
    const editNote = new Note();
    editNote.id = this.data;
    editNote.state = 'started';
    editNote.title = this.noteForm.controls.title.value;
    editNote.text = this.noteForm.controls.text.value;
    this.notesService.editNote(editNote).subscribe((data) => {
    this.dialogRef.close();
    },
    error => {
      if (error.status === 403) {
        this.errMessage = 'Unauthorized';
       } else {
      this.errMessage = error.message;
      }
    }
    );
  }
}
