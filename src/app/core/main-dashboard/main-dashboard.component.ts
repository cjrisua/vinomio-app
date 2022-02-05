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
  currentUser!: Profile;
  navigationSubscription!: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((p) => {
      if ('view' in p) {
        //const paramaction:string = p['view']
        //const action: DashboardItem = paramaction;
        //console.log(action);
        this.activeListItem =  p['view']
      }
    });

    if (!this.currentUser?.id) {
      const token = this.authService.getCurrentUser();
      const user = this.authService
        .getUserProfile(token)
        .subscribe((u) => (this.currentUser = u));
    }
  }
  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      //console.log('ngOnDestroy');
      this.navigationSubscription.unsubscribe();
    }
  }
  public get dashboardItem(): typeof DashboardItem {
    return DashboardItem;
  }
  setActiveComponent(event: any) {
    const action: DashboardItem = (<any>DashboardItem)[event.target.innerText];
    //console.log(action);
    if (action == this.activeListItem) {
      this.activeListItem = action;
      //console.log('refreshing');
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/home'], {
        queryParams: { view: this.activeListItem },
      });
    } else {
      this.activeListItem = action;
      this.reloadCurrentRoute();
    }
  }
  reloadCurrentRoute() {
    //let currentUrl = this.router.url;
    //console.log("reloadCurrentRoute")
    this.router.navigateByUrl('/', { skipLocationChange: true }).then((p) => {
      //this.router.onSameUrlNavigation = 'reload'
      this.router.navigate(['home'], {
        queryParams: { view: this.activeListItem },
      });
    });
  }
}
