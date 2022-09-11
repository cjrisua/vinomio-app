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
import { map, reduce, switchMap } from 'rxjs';
import { Collection } from '../models/Collection';
import { FormControl, FormGroup } from '@angular/forms';
import { query } from '@angular/animations';
import { Pipe, PipeTransform } from '@angular/core';

interface LooseObject {
  [key: string]: any
}

@Pipe({
  name: 'Vintages'
})
export class VintagesPipe implements PipeTransform {
  transform(vintage: any[], args?: any): any {
    const vintageList = vintage
      .map(p => p.Vintage.year)
      .reduce((r:any,a:any) => {
          r[a] = r[a] || [];
          r[a].push(a);
          return r
      },Object.create(null))
    return Object.values(vintageList).map((p:any) =>`${p[0]}`).join(" , ")
  }
}

@Component({
  selector: 'app-cellar-dashboard',
  templateUrl: './cellar-dashboard.component.html',
  styleUrls: ['./cellar-dashboard.component.css']
})

export class CellarDashboardComponent implements OnInit {

  activeListItem:DashboardItem = DashboardItem.Cellar
  
  currentUser!: Profile
  currentCollection: any[] = []
  _selection!:Vintage;
  searchForm!: FormGroup
  _cellarItemSelection!:any

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

    this.searchForm = new FormGroup({
      wine: new FormControl('')
    })
    console.log("reload...")
    const token = this.authService.getCurrentUser()
    const user = this.authService.getUserProfile(token)
      .pipe(
        map((userprofile:Profile) => userprofile))
      .subscribe((user:Profile)=> 
        this.collectionService.getCollection(user?.cellar_id)
        .pipe(
          switchMap((m) => m),
          reduce((r:any,a:any) =>{
            r[a.Vintage.Wine.id] = r[a.Vintage.Wine.id] || [];
            r[a.Vintage.Wine.id].push(a);
            return r
          },Object.create(null)),
          map((m:any) => Object.values(m))
        )
        .subscribe((collection) =>
        {
          //console.log(collection)
          this.currentCollection = collection
          this.currentUser = user
        })
      )
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
  onWineView(cellar:any){
    this._cellarItemSelection = cellar
    this.cellarActiveRoute = CellarDashboardActiveRoute.WineDetail
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
  /*
  public get myCollection():any[]{
    
    let result:any[] = []

    this.currentCollection.map((item:any) =>{
      //console.log(item)
      const collectionItem:{
          vintageId:number,
          wineId:number,
          name:string,
          mastervarietal:string,
          region:string, 
          bottleCount:number,
          bottleSize:string,
          price?:string,
          location?:string,
          status?:string,
          color?:string,
          type?:string,
          collectionevent?:any[]
        } = {
        vintageId: item.vintageId | 0,
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
        type: item.Vintage.Wine.type,
        collectionevent: item.CollectionEvents
      }
      const wineIndex = result.findIndex((i:any) => i?.vintageId == item.vintageId)
      if(wineIndex == -1)
        result.push(collectionItem)
      else
        result[wineIndex].bottleCount++

      return collectionItem
    })

   
    return result
  }*/
  ngOnDestroy(): void {
    
  }
  onKeyUp(){}
  onKeyDown(){}
  onClear(){}
}
