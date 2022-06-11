import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, EMPTY } from 'rxjs';
import { Profile } from 'src/app/models/Profile';
import { VinomioCollectionService } from 'src/app/services/vinomio-collection.service';

@Component({
  selector: 'app-wine-search-add',
  templateUrl: './wine-search-add.component.html',
  styleUrls: ['./wine-search-add.component.css']
})
export class WineSearchAddComponent implements OnInit {

  @Input() profile!: Profile
  @Input() navData!: any

  @Output() navEvent =  new EventEmitter<{}>();

  addWineForm!:FormGroup

  formats: { id: string; name: string }[] = [
    { id: '750ml', name: '750ml' },
    { id: '1.5L', name: '1.5L' },
  ];
  vintages: { id: number; name: string }[] = [
    {id:0, name:"Select Vintage"},
    {id:2018, name:"2018"},
    {id:2019, name:"2019"},
    {id:2020, name:"2020"},
    {id:2021, name:"2021"},
    {id:2022, name:"2022"},
    {id:2023, name:"2023"},
    {id:2024, name:"2024"},
    {id:2025, name:"2025"},
  ]
  constructor(
    private collectionService:VinomioCollectionService
  ) { }

  ngOnInit(): void {

    const vintage = this.navData.data.wine.Vintages.filter((i:any)=>i.id ==this.navData.data.vintageId)
    if(vintage && vintage.length > 0)
      this.vintages = [{id:vintage[0].year, name:`${vintage[0].year}`}]

    this.addWineForm = new FormGroup({
      purchasedOn : new FormControl('',[Validators.required, Validators.pattern('[0-1]{2}/[0-9]{2}/[0-9]{4}')]),
      deliverBy : new FormControl('',[Validators.required, Validators.pattern('[0-1]{2}/[0-9]{2}/[0-9]{4}')]),
      numOfBottles : new FormControl('1',[Validators.required, Validators.pattern('[0-9]+')]),
      price : new FormControl('',[Validators.required]),
      format : new FormControl("750ml",[Validators.required]),
      state : new FormControl(false)
    })
  }
  onBack(){
    this.navEvent.emit({history:this.navData.history})
  }
  onSubmit(){
    const data:any[] = [{
        //vintageId: this.navData.data.vintageId,
        vintage: this.vintages[0]?.name,
        wineId: this.navData.data.wine.id,
        cellarId: this.profile.cellar_id,
        price: this.addWineForm.value.price,
        bottleCount: this.addWineForm.value.numOfBottles,
        bottleSize: this.addWineForm.value.format,
        /*locationId: 0,
        acquiringSourceId: 0,
        allocationEventId: this.allocationEvent.id,*/
        purchasedOn:this.addWineForm.value.price,
        deliverBy: this.addWineForm.value.price,
        statusId:  this.addWineForm.value.state ? 'allocated' : 'pending'
      }];
      //console.log(data)
      
    if(data.length > 0){
      this.collectionService.add(data).pipe(
        catchError((err) => { console.debug(err); return EMPTY})
      )
      .subscribe((r) =>this.navEvent.emit({}));
    }
  }
  updateStatus(){
    this.addWineForm.patchValue({"state" : !this.addWineForm.value.state})
  }

  public get WineName():string{
    return `${this.navData.data.wine.name}`
  }
  public get Region():string{
    return `${this.navData.data.wine.Region.name}`
  }
  public get MasterVarietal():string{
    return `${this.navData.data.wine.MasterVarietal.name}`
  }
/**
 * 
 *  {
  "data": {
    "vintageId": 58,
    "wine": {
      "id": 24,
      "slug": "memento-mori-las-piedras-vineyard",
      "name": "Memento Mori Las Piedras Vineyard",
      "color": "Red",
      "type": "Red",
      "Producer": {
        "id": 7,
        "name": "Memento Mori"
      },
      "Region": {
        "id": 7,
        "name": "St Helena"
      },
      "MasterVarietal": {
        "id": 5,
        "name": "Cabernet Sauvignon"
      },
      "Vintages": [
        {
          "id": 58,
          "year": 2019
        },
        {
          "id": 62,
          "year": 2018
        }
      ]
    }
  },
  "history": "mem"
} 
 */
}
