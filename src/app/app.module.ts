import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterService } from './services/router.service';
import { RouterModule, Routes} from '@angular/router';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { NoteComponent } from './note/note.component';
import { MatDialogModule, MatListModule, MatSelectModule} from '@angular/material';
import { NotesService } from './services/notes.service';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [CanActivateRouteGuard],
    children: [
      {
        path: 'view/noteview',
        component: NoteViewComponent
      },
      {
        path: 'view/listview',
        component: ListViewComponent
      },
      {
        path: '',
        redirectTo: 'view/noteview',
        pathMatch: 'full'
      },
      {
        path: 'note/:noteId/edit',
        component: EditNoteOpenerComponent,
        outlet: 'noteEditOutlet'
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    NoteTakerComponent,
    NoteViewComponent,
    ListViewComponent,
    NoteComponent,
    EditNoteOpenerComponent,
    EditNoteViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    FormsModule,
    MatCardModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MatDialogModule,
    MatSelectModule
  ],
  providers: [NotesService, AuthenticationService, RouterService, CanActivateRouteGuard],
  bootstrap: [AppComponent],
  entryComponents: [EditNoteViewComponent]
})
export class AppModule { }
