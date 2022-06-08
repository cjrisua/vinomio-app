import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Profile } from 'src/app/models/Profile';

@Component({
  selector: 'app-wine-search-add',
  templateUrl: './wine-search-add.component.html',
  styleUrls: ['./wine-search-add.component.css']
})
export class WineSearchAddComponent implements OnInit {

  @Input() profile!: Profile
  @Input() navData!: any

  @Output() navEvent =  new EventEmitter<{}>();
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
  constructor() { }

  ngOnInit(): void {
    const vintage = this.navData.data.wine.Vintages.filter((i:any)=>i.id ==this.navData.data.vintageId)
    console.log(vintage)
    if(vintage && vintage.length > 0)
      this.vintages = [{id:vintage[0].year, name:`${vintage[0].year}`}]
      console.log(this.vintages)
  }
  onBack(){
    this.navEvent.emit({history:this.navData.history})
  }
  onAdd(){
    this.navEvent.emit({})
  }
  updateStatus(){}

  public get WineName():string{
    return `${this.navData.data.wine.name}`
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
