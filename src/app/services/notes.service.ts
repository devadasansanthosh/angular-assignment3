import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthenticationService } from './authentication.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

@Injectable()
export class NotesService {

  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;

  constructor(private httpClient: HttpClient,
    private authService: AuthenticationService) {
    this.notes = [];
    this.notesSubject = new BehaviorSubject([]);
  }


  fetchNotesFromServer() {
    this.httpClient.get<Array<Note>>('http://localhost:3000/api/v1/notes', {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).subscribe(res => {
      this.notes = res;
      this.notesSubject.next(this.notes);
    });


  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    return this.httpClient.post<Note>('http://localhost:3000/api/v1/notes', note, {
    headers : new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).pipe(
     tap(response => {
         this.notes.push(response);
         this.notesSubject.next(this.notes);
  })
  );
  }

  editNote(note: Note): Observable<Note> {
    return this.httpClient.put<Note>(`http://localhost:3000/api/v1/notes/${note.id}`, note, {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
      }).pipe(
      tap(editedNote => {
        const foundNote = this.notes.find(note => note.id === editedNote.id);
        Object.assign(foundNote, editedNote);
        this.notesSubject.next(this.notes);
      })
    );
  }

  getNoteById(noteId: number) {
    return this.notes.find(note => note.id === noteId);
}
}
