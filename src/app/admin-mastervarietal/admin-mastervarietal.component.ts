import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MasterVarietal } from '../models/MasterVarietal';
import { VinomioMastervarietalService } from '../services/vinomio-mastervarietal.service';

@Component({
  selector: 'app-admin-mastervarietal',
  templateUrl: './admin-mastervarietal.component.html',
  styleUrls: ['./admin-mastervarietal.component.css']
})
export class AdminMastervarietalComponent implements OnInit {

  displayedColumns=['id','name','varieties']
  exclusionColumns=['varieties']
  dataSource = new MatTableDataSource<MasterVarietal>();
  
  constructor(
    private mastervarietalService: VinomioMastervarietalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mastervarietalService.get().subscribe((data) => {
      this.dataSource.data = data;
    });
  }
  public ViewOrDeleteModelItem(wine: any) {
    console.log(`naviage action: ${wine.action} with event of ${JSON.stringify(wine.event)}`);
    if(wine.action=='view')
      this.router.navigateByUrl('/admin/mastervarietal/' + wine.event.id, { state: wine.event });
    else if(wine.action=='delete')
      this.mastervarietalService.delete(wine.event.id).subscribe(() => this.ngOnInit())
  }

}
