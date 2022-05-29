import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CellarDashboardActiveRoute, DashboardItem, MODEL, WineType } from '../app.module';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';
import { User } from '../models/User';
import { Vintage } from '../models/Vintage';
import { VinomioCollectionService } from '../services/vinomio-collection.service';
import { Profile } from '../models/Profile';
import { VinomioCellarService } from '../services/vinomio-cellar.service';
import { map } from 'rxjs/operators';
import { Collection } from '../models/Collection';

interface LooseObject {
  [key: string]: any
}

@Component({
  selector: 'app-cellar-dashboard',
  templateUrl: './cellar-dashboard.component.html',
  styleUrls: ['./cellar-dashboard.component.css']
})

export class CellarDashboardComponent implements OnInit {

  activeListItem:DashboardItem = DashboardItem.Cellar
  
  currentUser!: Profile
  currentCollection: Collection[] = []
  _selection!:Vintage;

  cellarActiveRoute:CellarDashboardActiveRoute = CellarDashboardActiveRoute.Dashboard
  
  constructor(
    private authService: AuthService,
    private collectionService: VinomioCollectionService,
    private router: Router,
    private cellarService: VinomioCellarService,
  ) { 
    this.currentUser = this.authService.currentUser
  }

  ngOnInit(): void {
    //console.log("CellarDashboardComponent - ngOnInit")
    //if(!this.currentUser?.id){
      const token = this.authService.getCurrentUser()
      const user = this.authService.getUserProfile(token)
        .pipe(
          map((userprofile:Profile) => userprofile))
        .subscribe((user:Profile)=> 
          this.collectionService.getCollection(user?.cellar_id).subscribe((collection) =>
          {
            this.currentCollection = collection
            this.currentUser = user
          })
        )
    //}
  }
  public setStyles(Type:string){

    const type: WineType = <WineType> Type;
    //console.log(Type)
    return {'color': 
      type == WineType.White ? '#E8DCA1':
      type == WineType.Red ? '#651827' :
      'black' 
    }
  }
  onSelection(selection:Vintage){
    this._selection = selection;
  }
  onWineAdd(){
    //this.activeListItem = DashboardItem.Profile;
    this.cellarActiveRoute = CellarDashboardActiveRoute.AddWine
  }
  onWineAllocation(){
    this.cellarActiveRoute = CellarDashboardActiveRoute.WineAllocation
  }
  public get activeRoute(): typeof CellarDashboardActiveRoute {
    return CellarDashboardActiveRoute; 
  }
  onAddWineToCellar(){
    
    const collection_item = {
      vintageId:this._selection.id,
      cellarId: this.currentUser['cellar_id'],
      purchaseNote: "",

    }
    /*
    this.collectionService.add(collection_item).subscribe(
        //() => this.router.navigateByUrl('/cellar', { skipLocationChange: true })
        //.then(() => { this.router.navigate(['cellar']);}) 
        () => { this.currentCollection['size'] = this.currentCollection['size']+1; }
    );*/
  }
  public get myCollection():any[]{
    
    let result:any[] = []

    this.currentCollection.map((item:any) =>{
      //console.log(item)
      const collectionItem:{wineId:number,
          name:string,
          mastervarietal:string,
          region:string, 
          bottleCount:number,
          bottleSize:string,
          price?:string,
          location?:string,
          status?:string,
          color?:string,
          type?:string
        } = {
        wineId: item.Vintage.Wine.id | 0,
        name: `${item.Vintage.year} ${item.Vintage.Wine.name}`,
        mastervarietal: item.Vintage.Wine.MasterVarietal.name,
        region: item.Vintage.Wine.Region.name,
        bottleCount: 1,
        bottleSize: item.bottleSize,
        price: item.price,
        status:item.status,
        location:item.location,
        color: item.Vintage.Wine.color,
        type: item.Vintage.Wine.type
      }
      const wineIndex = result.findIndex((i:any) => i?.wineId == item.Vintage.Wine.id)
      if(wineIndex == -1)
        result.push(collectionItem)
      else
        result[wineIndex].bottleCount++

      return collectionItem
    })

    return result
  }
  ngOnDestroy(): void {
    
  }
}
