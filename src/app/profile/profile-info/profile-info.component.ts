import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'src/app/models/Profile';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  @Input() profile!:Profile
  profileForm!: FormGroup;
  
  constructor() { }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      firstname:  new FormControl(this.profile.firstname,[Validators.required,Validators.minLength(3)]),
      lastname:  new FormControl(this.profile.lastname,[Validators.required,Validators.minLength(3)]),
      email:  new FormControl(this.profile.email,[Validators.required,Validators.minLength(3)]),
      handler:  new FormControl(this.profile.handler,[Validators.required,Validators.minLength(3)]),
    })
    //console.log(this.profile)
  }
  onSubmit(){
    
  }
}
