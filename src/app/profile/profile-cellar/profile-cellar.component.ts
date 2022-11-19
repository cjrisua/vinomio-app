import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Cellar } from 'src/app/models/Cellar';
import { Profile } from 'src/app/models/Profile';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { VinomioCellarService } from 'src/app/services/vinomio-cellar.service';

 

@Component({
  selector: 'app-profile-cellar',
  templateUrl: './profile-cellar.component.html',
  styleUrls: ['./profile-cellar.component.css']
})
export class ProfileCellarComponent implements OnInit {

  profile!:Profile

  userCellar!:Cellar
  owner!:User
  cellarForm!: FormGroup;
  features:any[]=[]
  _clickedId:number = -1
  _show = false
  CellarAttributes=['Name','Locations','Bins']

  constructor(
    private cellarService: VinomioCellarService,
    private authService: AuthService) { 
      this.profile = this.authService.getCurrentUser()
    }

  ngOnInit(): void {
    
    this.cellarForm = new FormGroup({})
    const cellarid:number = this.profile.cellar || 0;
    this.cellarService.get(cellarid).subscribe((res) => { 
      this.userCellar = res;
      this._initAttributes()
      this.owner = this.userCellar.Users.filter( user => user.Subscribers?.role_id == 1)[0]
    })
  }
  getOwner(): User{
    return this.owner
  }
  SubscriberCount():number{
    return this.userCellar && this.userCellar.Users ? this.userCellar.Users.length : 0;
  }
  onSubmit(){

  }
  showDropdown(){

  }
  showAttributes(id:number){
   if(this._clickedId == id){
     this._show = !this._show
     this._clickedId = -1
     return this._show
   }
    return false
  }
  isClicked(id:number){
    this._clickedId = id
  }
  onAddNewAttribute(attr:string,element:any){
    element.innerHTML=attr
  }
  addAttribute(){
    this.features.push({key:"", value:"", readonly:false})
    console.log(this.features)
  }
  _initAttributes(){
    this.features =Object.keys(this.userCellar.attributes).map((key:string) => {
      return { 
        key : key,
        value :  (<any>this.userCellar.attributes)[key],
        readonly: true
        } 
    })
  }
}
