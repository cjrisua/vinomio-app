import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CellarDashboardActiveRoute, DashboardItem, MODEL, WineType } from '../../app.module';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';
import { User } from '../../models/User';
import { Vintage } from '../../models/Vintage';
import { VinomioCollectionService } from '../../services/vinomio-collection.service';
import { Profile } from '../../models/Profile';
import { VinomioCellarService } from '../../services/vinomio-cellar.service';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, filter, map, Observable, OperatorFunction, reduce, startWith, Subject, switchMap } from 'rxjs';
import { Collection } from '../../models/Collection';
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
      .map(p => p.year)
      .reduce((r:any,a:any) => {
          r[a] = r[a] || [];
          r[a].push(a);
          return r
      },Object.create(null))
    return Object.values(vintageList).map((p:any) =>{ return `${p[0]}` }).join(" , ")
  }
}

@Component({
  selector: 'app-cellar-dashboard',
  templateUrl: './cellar-dashboard.component.html',
  styleUrls: ['./cellar-dashboard.component.css']
})


export class CellarDashboardComponent implements OnInit {

  @ViewChild("collectionItems") nameField!: ElementRef<HTMLElement>;

  activeListItem:DashboardItem = DashboardItem.Cellar
  
  currentUser!: Profile
  currentCollection: any[] = []
  wineInCollection:any[] = []
  _selection!:Vintage;
  searchForm!: FormGroup
  _cellarItemSelection!:any
  _itemCollectionId!:number
  _focusTo:number = -1;

  searchControl !: FormControl
  search!: OperatorFunction<string, readonly any[]>;
  //subject: Subject<any> = new Subject();

  cellarActiveRoute:CellarDashboardActiveRoute = CellarDashboardActiveRoute.Dashboard
  
  constructor(
    private authService: AuthService,
    private collectionService: VinomioCollectionService,
    private route: ActivatedRoute,
    private router: Router,
    private cellarService: VinomioCellarService,
  ) { 
    this.currentUser = this.authService.getCurrentUser()
  }

  ngAfterViewChecked(): void {
    if(this.nameField && this._focusTo > -1)
      this.nameField.nativeElement.querySelectorAll(`[id="${this._focusTo}"]`)[0].scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center'
    });
  }
  private groupByWineId(map:Map<number,any[]>,Item:any){
    const key = Item.Vintage.Wine.id;
    const value = map.get(key) || Object.assign({average:[],data:[]})
    value.data.push(Item)
    const exist = value.average.find((p:any) => p.vintageId == Item.Vintage.id)
    if(Item.Vintage.Review.average && !exist){
      value.average.push({score:+Item.Vintage.Review.average , comment:Item.Vintage.Review.count, vintageId:Item.Vintage.id})
    }
    return map.set(key,value)
  }
  private processWineGrouping(m:Map<any,any>){
    return Array.from(m.entries()).map((reduced:any) => { 
      const key=reduced[0]
      const value=reduced[1]
      return { 
        id:key, average:value.average, 
        type:value.data[0].Vintage.Wine.type, 
        wineName: value.data[0].Vintage.Wine.name,
        regionName: value.data[0].Vintage.Wine.Region.name,
        masterVarietalName:value.data[0].Vintage.Wine.MasterVarietal.name,
        vintage:value.data.map((m:any) =>{return {year:m.Vintage.year}}),
        data:value.data,
        comments:value.average.reduce((sum:number,current:any) => sum + (+current.comment), 0)
      }
     });
  }
  private getCollection(Filter?:{}){
    const filterStatus=['allocated','pending']
    this.collectionService.getCollection(this.currentUser.cellar,Filter)
    .pipe(
      switchMap((m) => m),
      map((m:any) => { this.currentCollection = m; return m}),
      filter((item:any) => filterStatus.includes(item.statusId)),
      reduce((r:Map<number,any[]>,a:any) =>this.groupByWineId(r,a), new Map),
      map((m:Map<any,any>) => this.processWineGrouping(m)),
      catchError(()=> { console.log("ERROR"); return EMPTY})
    )
    .subscribe((collection:any) =>
    {
      this.wineInCollection = collection
    })
  }
  ngOnInit(): void {
    this.searchControl = new FormControl()
    this.searchForm = new FormGroup({
      wine: new FormControl('')
    })
    this.getCollection()
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
  onFilterList() : void {
    var Filter!:{vintage__year?:any,wine__name__iLike?:any};
    this.search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      startWith(''),
      filter((i) => i.trim().length > 0),
      switchMap((searchText: string ) => {
          const vintage = searchText.match(/[0-9]{4}/) || undefined;
          const keyword = searchText.replace(/[0-9]{4}/, '') || undefined;
          Filter = {
            vintage__year: vintage ? vintage[0] : vintage,
            wine__name__iLike: keyword,
          };
          this.getCollection(Filter);
          //console.log("Running")
          //console.log(searchText)
        return EMPTY;
      }),
      catchError((e)=>{ console .log(e); return []})
    )
  }
  resultFormatListValue(value: any): string {
    return value.name;
  }
  inputFormatListValue(value: any): string {
     return value.name;
  }
  onSearchSelection(selection:any):any{
    //this.wines = []
    //this.wines.push(selection.item)
  }
  onKeyUp(event:any,keyword:any){
    //console.log(event)
    if(keyword.trim().length==0){
      this.getCollection()
      console.log("Run")
    }
    
  }
  onSelection(selection:Vintage){
    this._selection = selection;
  }
  onWineView(cellar:any){
    //this._cellarItemSelection = cellar
    //this.cellarActiveRoute = CellarDashboardActiveRoute.WineDetail
    //this.router.navigate(['./wine'])
  }
  onWineAdd(){
    //this.activeListItem = DashboardItem.Profile;
    this.cellarActiveRoute = CellarDashboardActiveRoute.AddWine
  }
  onActionEvent(action:any){
    console.debug(action)
     if(action.id=="delete"){
      this.cellarActiveRoute = CellarDashboardActiveRoute.DeleteWine
      this._itemCollectionId= action.data.id
     }
     else if (action.id=="edit")
      this.cellarActiveRoute = CellarDashboardActiveRoute.EditWine
     else if (action.id=="back"){
      this.cellarActiveRoute = CellarDashboardActiveRoute.Dashboard
      this._focusTo = action.data
     }
     else{
        //console.debug(this._cellarItemSelection)
        //console.debug(action)
        if(action.id==="touched")
          this._cellarItemSelection = action.data
        this.cellarActiveRoute = CellarDashboardActiveRoute.WineDetail
     }
  }
  onWineAllocation(){
    this.cellarActiveRoute = CellarDashboardActiveRoute.WineAllocation
  }
  public get activeRoute(): typeof CellarDashboardActiveRoute {
    return CellarDashboardActiveRoute; 
  }
  onNavigateToReview()
  {
    this.router.navigate(['wine-review']);
  }
  onAddWineToCellar(){
    
    const collection_item = {
      vintageId:this._selection.id,
      cellarId: this.currentUser['cellar'],
      purchaseNote: "",

    }
  }
  ngOnDestroy(): void {
    
  }
  //onKeyUp(){}
  onKeyDown(){}
  onClear(){}
}
