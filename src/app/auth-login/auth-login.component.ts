import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {

  authForm!: FormGroup;
  submitted = false
  roles!:any
  errorMessage!:any 
  isLoggedIn!:any
  isLoginFailed!:any

  constructor(
    private route: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.minLength(3)]),
      password: new FormControl('', [Validators.required]),
    });
  }
  onSubmit(): void {
    this.authService.login(this.authForm.value)
  }
  showFormControls(form: any) {
    return form && form.controls.email && form.controls.email.value; // Dr. IQ
  }
}
