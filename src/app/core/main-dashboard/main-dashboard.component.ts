import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DashboardItem } from 'src/app/app.module';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';
import { User } from 'src/app/models/User';
import { Profile } from 'src/app/models/Profile';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css'],
})
export class MainDashboardComponent implements OnInit {
  activeListItem!: DashboardItem;
  currentUser!: Profile
  navigationSubscription!: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}
  ngOnInit(): void {
    const token = this.authService.getCurrentUser();
    this.authService
      .getUserProfile(token)
      .subscribe((u) =>{ 
        this.currentUser = u
    });
  }
  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  public get dashboardItem(): typeof DashboardItem {
    return DashboardItem;
  }
  get f(){
  return JSON.stringify(this.currentUser)
  }
  setActiveComponent(event: any) {
    const action: DashboardItem = (<any>DashboardItem)[event.target.innerText];
    if (action == this.activeListItem) {
      this.activeListItem = action;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/'], {
        queryParams: { view: this.activeListItem },
      });
    } else {
      //this.activeListItem = action;
      //this.reloadCurrentRoute();
      this.router.navigate([action],{relativeTo:this.route})
    }
  }
  reloadCurrentRoute() {
    //let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then((p) => {
      //this.router.onSameUrlNavigation = 'reload'
      this.router.navigate([''], {
        queryParams: { view: this.activeListItem },
      });
    });
  }
}
