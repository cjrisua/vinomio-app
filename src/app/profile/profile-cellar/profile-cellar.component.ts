import { Component, OnInit, Input } from '@angular/core';
import { Cellar } from 'src/app/models/Cellar';
import { Profile } from 'src/app/models/Profile';
import { User } from 'src/app/models/User';
import { VinomioCellarService } from 'src/app/services/vinomio-cellar.service';

@Component({
  selector: 'app-profile-cellar',
  templateUrl: './profile-cellar.component.html',
  styleUrls: ['./profile-cellar.component.css']
})
export class ProfileCellarComponent implements OnInit {

  @Input() profile!:Profile

  userCellar!:Cellar
  owner!:User

  constructor(private cellarService: VinomioCellarService) { }

  ngOnInit(): void {
    const cellarid:number = this.profile.cellar_id || 0;
    this.cellarService.get(cellarid).subscribe((res) => { 
      this.userCellar = res;
      this.owner = this.userCellar.Users.filter( user => user.Subscribers?.role_id == 1)[0]
    })
  }
  getOwner(): User{
    return this.owner
  }
  SubscriberCount():number{
    return this.userCellar && this.userCellar.Users ? this.userCellar.Users.length : 0;
  }
}
