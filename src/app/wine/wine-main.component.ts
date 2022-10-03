import { Component, Input, OnInit } from '@angular/core';
import { Action, UserEventAction, Module } from '../app.module';
import { Profile } from '../models/Profile';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-wine-main',
  templateUrl: './wine-main.component.html',
  styleUrls: []
})
export class WineMainComponent implements OnInit {

  profile!: Profile
  navData!: any
  userNavigation!:UserEventAction 
  constructor(
    private authService: AuthService
  ) { 
    this.profile = this.authService.getCurrentUser()
  }

  public get wineAction(): typeof Action {
    return Action;
  }

  ngOnInit(): void {
    this.initNavState()
  }
  private initNavState(){
    this.userNavigation = new UserEventAction(Action.List, Module.WineSearch)
  }
  NavEvent(event:{action?:UserEventAction,data?:any,history?:any}){

    this.navData = {data:event.data,history:event.history}
    
    if(event.action)
      this.userNavigation = event.action
    else
      this.initNavState()
  }

}
