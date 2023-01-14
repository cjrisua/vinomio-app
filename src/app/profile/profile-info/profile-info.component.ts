import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'src/app/models/Profile';
import { AuthService } from 'src/app/services/auth.service';
import { VinomioCellarService } from 'src/app/services/vinomio-cellar.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css'],
})
export class ProfileInfoComponent implements OnInit {

  profile!:Profile
  profileForm!: FormGroup;
  showForm:boolean = false
  
  constructor(
    private cellarService: VinomioCellarService,
    private authService: AuthService
  ) {
    this.profile = this.authService.getCurrentUser()
    //console.debug(this.profile)
   }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      firstName:  new FormControl(this.profile?.firstName,[Validators.required,Validators.minLength(3)]),
      lastName:  new FormControl(this.profile?.lastName,[Validators.required,Validators.minLength(3)]),
      email:  new FormControl(this.profile?.email,[Validators.required,Validators.minLength(3)]),
      handler:  new FormControl(this.profile?.handler,[Validators.required,Validators.minLength(3)]),
    })
  }
  onSubmit(){
    
  }
  get f(){
    return JSON.stringify(this.profile)
  }
  
  onAddCellar(){
    this.showForm = !this.showForm
  }
  onTabChanged($event:any) {
    this.showForm = false
  }
}
