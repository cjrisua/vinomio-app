import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MasterVarietal } from '../../models/MasterVarietal';
import { VinomioMastervarietalService } from '../../services/vinomio-mastervarietal.service';

@Component({
  selector: 'app-admin-mastervarietal',
  templateUrl: './admin-mastervarietal.component.html',
  styleUrls: ['./admin-mastervarietal.component.css']
})
export class AdminMastervarietalComponent implements OnInit {

  displayedColumns=['id','name','varieties']
  exclusionColumns=['varieties']
  dataSource = new MatTableDataSource<MasterVarietal>();
  isEmpty!:string
  constructor(
    private mastervarietalService: VinomioMastervarietalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getSourceData()
  }
  private getSourceData(text?:string){
    this.mastervarietalService.get(text).subscribe((data) => {
      this.dataSource.data = data;
      this.isEmpty= data.length == 0 ? 'true':'false';
    });
  }
  public searchEvent(keyword:string){
    this.getSourceData(keyword)
  }
  public ViewOrDeleteModelItem(wine: any) {
    console.log(`naviage action: ${wine.action} with event of ${JSON.stringify(wine.event)}`);
    if(wine.action=='view')
      this.router.navigateByUrl('/admin/mastervarietal/' + wine.event.id, { state: wine.event });
    else if(wine.action=='delete')
      this.mastervarietalService.delete(wine.event.id).subscribe(() => this.ngOnInit())
  }
  public get showing(){
    return {limit:this.dataSource.data.length,count:this.mastervarietalService.count}
  }
}
