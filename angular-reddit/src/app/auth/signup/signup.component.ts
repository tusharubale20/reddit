import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupRequestPayload } from './signup-request.payload';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupRequestpayload: SignupRequestPayload
  signupForm: FormGroup;

  constructor(private authService: AuthService, private router: Router,
    private toastr: ToastrService, private translate: TranslateService) { 
    
      this.signupRequestpayload = {
      username: '',
      email: '',
      password: ''
    }
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  signup() {
    this.signupRequestpayload.email = this.signupForm.get('email').value;
    this.signupRequestpayload.username = this.signupForm.get('username').value;
    this.signupRequestpayload.password = this.signupForm.get('password').value;

    this.authService.signup(this.signupRequestpayload)
      .subscribe(() => {
        this.router.navigate(['/login'],
          {queryParams: {registered: 'true'} });
      }, (error) => {
        throwError(error);
        this.toastr.error('Failed to register. Please try again.');
      });
  }

}
