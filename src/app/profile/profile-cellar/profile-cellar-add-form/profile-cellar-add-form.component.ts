import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/Profile';
import { VinomioCellarService } from 'src/app/services/vinomio-cellar.service';

@Component({
  selector: 'app-profile-cellar-add-form',
  templateUrl: './profile-cellar-add-form.component.html',
  styleUrls: ['./profile-cellar-add-form.component.css']
})
export class ProfileCellarAddFormComponent implements OnInit {

  @Input() profile!: Profile
  mainForm!: FormGroup;
  constructor(
    private cellarService:VinomioCellarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mainForm = new FormGroup({
      owner: new FormControl(`${this.profile.firstname} ${this.profile.lastname}`),
      role: new FormControl(null),
      size: new FormControl('',[Validators.required, Validators.pattern('[0-9]+')])
    });
  }
  onSubmit(){
    let attributes = {size:this.mainForm.value.size}
    const data = {owner:this.profile.id, role: this.mainForm.value.role == null ? 'admin' : this.mainForm.value.role ,attributes:attributes}
    this.cellarService.add(data).subscribe(() => 
      {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['home'],{queryParams: { view: 'profile'}})
      }
    )
  }
  onRoleSection(event:any){
    this.mainForm.value.role = event.target.value
  }
  showFormControls(form: any) {
    return form && form.controls.name &&
    form.controls.name.value; // Dr. IQ
  }
}
