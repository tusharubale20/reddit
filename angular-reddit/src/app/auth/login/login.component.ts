import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRequestPayload } from './login-request.payload';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  isError: boolean;
  registerSuccessMessage: String;
  loginRequestPayload: LoginRequestPayload;
  loginForm: FormGroup;
  loginProcessing: boolean;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute,
    private router: Router, private toastr: ToastrService,
    private translate: TranslateService) {

    this.loginProcessing = false;
      
    this.loginRequestPayload = {
      username: '',
      password: ''
    }
   }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.activatedRoute.queryParams
    .subscribe(params => {
      if( params.registered != undefined && params.registered === 'true') {
        this.toastr.success('Signed up successfully!');
        this.registerSuccessMessage = 'Please check your mail inbox for Activation mail.' 
          + 'You need to actiate your account before Login.'
      }
    });
  }

  login() {
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    this.loginProcessing = true;

    this.authService.login(this.loginRequestPayload)
      .subscribe(data => {
        this.isError = false;
        this.router.navigateByUrl('/');
        this.toastr.success('Login successful!'); 
      },error => {
          this.isError = true;
          this.loginProcessing = false;
          this.toastr.error('Login failed!');
      });
  }

}
