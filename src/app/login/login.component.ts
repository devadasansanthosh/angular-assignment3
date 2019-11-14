import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    username = new FormControl();
    password = new FormControl();
    errMessage: string;
    submitMessage: string;

  @ViewChild(FormGroupDirective)
    formGroupDirective: FormGroupDirective;
  constructor(private formBuilder: FormBuilder,
                private authService: AuthenticationService,
                private routerService: RouterService) {
        this.loginForm = this.formBuilder.group({
          username: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
          password: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
        });
    }

    loginSubmit() {
      this.authService.authenticateUser(this.loginForm.value).subscribe( res => {
      this.authService.setBearerToken(res['token']);
      this.routerService.routeToDashboard();
      },
    error => {
      if (error.status === 403) {
        this.submitMessage = 'Unauthorized';
       } else {
      this.submitMessage = error.message;
      }
    }
    );
      this.formGroupDirective.resetForm();
    }
    ngOnInit() {

    }
}
