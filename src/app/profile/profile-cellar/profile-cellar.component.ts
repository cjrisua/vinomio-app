import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fromEventPattern } from 'rxjs';
import { Cellar } from 'src/app/models/Cellar';
import { Profile } from 'src/app/models/Profile';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { VinomioCellarService } from 'src/app/services/vinomio-cellar.service';

 export interface CellarAttribute{
   key:string, 
   value:string, 
   readonly:boolean
 }

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
  features:CellarAttribute[]=[]
  CellarAttributes=['size','Name','Locations','Bins']
  _showAddStatus:boolean=true

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
  _setAddButtonStatus(){
    this._showAddStatus = !this._showAddStatus
  }
  get isAddDisabled(){
    return !this._showAddStatus
  }
  get cellarAttributes(){
    return new Set([...this.CellarAttributes].filter(x => new Set(this.features.map(i=>i.key)).has(x)==false))
    //console.log(diff)

    //return this.CellarAttributes
  }
  onSelectedAttribute(attr:any){
    this._setAddButtonStatus()
    this.features[this.features.length-1].key=attr
    this.features[this.features.length-1].readonly=true
  }
  onAddNewAttribute(){
    this._setAddButtonStatus()
    this.features.push({key:"", value:"", readonly:false})
  }
  onRemoveNewAttribute(attr:any){
    console.debug(attr)
    //this._setAddButtonStatus()
    this.features = this.features.filter(x => x.key != attr.key)
    this._showAddStatus = true
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
