import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showRegistration: boolean = true

  constructor(
    public authService : AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {

    console.log(this.router);

  }
  Logout(){
    this.authService.signOut()
  }

  SingUp(){
    //this.router.navigateByUrl('signup')
  }
}
