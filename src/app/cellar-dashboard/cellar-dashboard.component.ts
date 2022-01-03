import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardItem, MODEL } from '../app.module';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cellar-dashboard',
  templateUrl: './cellar-dashboard.component.html',
  styleUrls: ['./cellar-dashboard.component.css']
})
export class CellarDashboardComponent implements OnInit {

  activeListItem!:DashboardItem
  
  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((p)=>{
      if('view' in p)
        this.activeListItem = DashboardItem.Dashboard
      console.log(p)
    })
  }
  ngOnDestroy(): void {
    
  }
  public get dashboardItem(): typeof DashboardItem {
    return DashboardItem; 
  }
  setActiveComponent(event:any){
    //if(this.activeListItem !== DashboardItem.Dashboard)
      this.location.replaceState('cellar')
    this.activeListItem =(<any>DashboardItem)[event.target.innerText]
  }
}
