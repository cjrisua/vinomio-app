import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { VinomioReviewService } from 'src/app/services/vinomio-review.service';
import { Profile } from '../../models/Profile';
import { Vintage } from '../../models/Vintage';

@Component({
  selector: 'app-cellar-wine-detail',
  templateUrl: './cellar-wine-detail.component.html',
  styleUrls: ['./cellar-wine-detail.component.css']
})
export class CellarWineDetailComponent implements OnInit {

  //@Input() currentUser!:Profile
  wine!:any
  @Output() actionEvent =  new EventEmitter<{}>();
  
  cellarItem!:any
  vintages:any=[]
  vintageSelection:any=[]
  activeTab:number=0
  activeYear:number=0

  reviews:any[] =[]

  constructor(
    private router: Router,
    private reviewService: VinomioReviewService
  ) { }

  ngOnInit(): void {
    this.wine = <any[]>history.state.data;
    if(this.wine){
      this.cellarItem = this.wine[0].Vintage.Wine
      this.wine.reduce((res:any,value:any)=>{
        if (!res[value.Vintage.year]){
          res[value.Vintage.year] = {year:value.Vintage.year,allocated:[],pending:[]}
          this.vintages.push(res[value.Vintage.year])
        }
        //res[value.Vintage.year].qty.push(value);
        //allocated
      if(value.statusId == "allocated")
        res[value.Vintage.year].allocated.push(value)
      else if(value.statusId == "pending")
      res[value.Vintage.year].pending.push(value)
        return res;
      },{})
      this.activeYear = this.vintages[0].year
      this.onVintageSelection(this.activeYear)
      const wineId=this.wine[0].Vintage.Wine.id
      const vintageId=this.wine[0].Vintage.id
      console.log(vintageId)
      this.reviewService.getListByWine(wineId,vintageId).subscribe((res)=> this.reviews=res)
    }
  }
  isDisabled(item:number){
    return false
  }
  isActive(item:number){
    return this.activeTab == item
  }
  onSelection(id:number){
    this.activeTab = id
    this.onVintageSelection(this.activeYear)
  }
  onDeleteItem(item:any){
    this.actionEvent.emit({id:"delete", data:item})
  }
  onEditItem(item:any){
    this.actionEvent.emit({id:"edit", data:item})
  }
  onRelocateItem(item:any){
    this.actionEvent.emit({id:"relocate", data:item})
  }
  onVintageSelection(Year:any){
    const filtered = this.vintages.filter((i:any) => i.year==Year)
    if(this.activeTab == 0)
      this.vintageSelection =filtered.map((i:any)=>i.allocated)[0]
    else if(this.activeTab == 1)
      this.vintageSelection = filtered.map((i:any)=>i.pending)[0]
    else
      this.vintageSelection = []
  }
  onGoBack(){
    //this.actionEvent.emit({id:"back", data:this.wine[0].Vintage.Wine.id})
  }
}
