import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

export class SignUpForm {
  constructor(
  public email:string,
  public password:string,
  public firstName:string,
  public lastName:string,
  public handler:string
  ){}
}

@Component({
  selector: 'app-navbar-form-signup',
  templateUrl: './navbar-form-signup.component.html',
  styleUrls: ['./navbar-form-signup.component.css']
})
export class NavbarFormSignupComponent implements OnInit {

  signUpForm!: FormGroup
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route:ActivatedRoute,
    private router: Router,
    private auth:AuthService
    ) { }

  ngOnInit(): void {
    this.signUpForm =  new FormGroup({
      handler: new FormControl('',[Validators.required]),
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required]),
      password2: new FormControl('',[Validators.required]),
    });
  }
  onSubmit(){

    //validate password
    this.MustMatch('password','password2')
    .subscribe(() => {
      const signupform:SignUpForm = this.signUpForm.value;
      this.auth.signUp(signupform).pipe(
        map((user:User) => {return {email:signupform.email, password:signupform.password}}),
      ).subscribe((authUser)=> {
          this.auth.login(authUser)
      } )
    });
  }
  showFormControls(form:any){

  }
  MustMatch(controlName: string, matchingControlName: string): Observable<boolean> {
    return new Observable(subscriber => {
        const control = this.signUpForm.controls[controlName];
        const matchingControl = this.signUpForm.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors['mustMatch']) 
            subscriber.error("return if another validator has already found an error on the matchingControl");
          
        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
            subscriber.error("Password mismatch");
        } else {
          subscriber.next();
        }
    })
  }
}

