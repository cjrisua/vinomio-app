import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { Profile } from 'src/app/models/Profile';
import { AuthService } from 'src/app/services/auth.service';
import { VinomioCellarService } from 'src/app/services/vinomio-cellar.service';
import { ErrorDialogService } from 'src/app/shared/errors/error-dialog.service';

@Component({
  selector: 'app-profile-cellar-add-form',
  templateUrl: './profile-cellar-add-form.component.html',
  styleUrls: ['./profile-cellar-add-form.component.css']
})
export class ProfileCellarAddFormComponent implements OnInit {

  currentUser: Profile
  mainForm!: FormGroup;
  constructor(
    private cellarService:VinomioCellarService,
    private errorHandlerService: ErrorDialogService,
    private authService: AuthService,
    private router: Router
  ) { 
    this.currentUser = this.authService.getCurrentUser()
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser()
    this.mainForm = new FormGroup({
      owner: new FormControl(`${this.currentUser.firstName} ${this.currentUser.lastName}`),
      role: new FormControl(null),
      size: new FormControl('',[Validators.required, Validators.pattern('[0-9]+')])
    });
  }
  onSubmit(){
    let attributes = {capacity:this.mainForm.value.size}
    const data = {
      owner:this.currentUser.id, 
      role: this.mainForm.value.role == null ? 'admin' : this.mainForm.value.role ,attributes:attributes,
      name: 'cellar'
    }
    this.cellarService
      .add(data)
      .pipe(
        catchError((exception) => {
          this.errorHandlerService.openDialog(
            exception?.error.message || 'Undefined client error',
            exception?.status
          );
          return EMPTY;
        })
      )
      .subscribe((responseDao) => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['cellar']);
      });
  }
  onRoleSection(event:any){
    this.mainForm.value.role = event.target.value
  }
  showFormControls(form: any) {
    return form && form.controls.name &&
    form.controls.name.value; // Dr. IQ
  }
}
