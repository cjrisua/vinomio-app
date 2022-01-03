import { Component, OnInit } from '@angular/core';
import { VinomioWineService } from '../services/vinomio-wine.service';
import { Wine } from '../models/Wine';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-wines',
  templateUrl: './admin-wines.component.html',
  styleUrls: ['./admin-wines.component.css']
})
export class AdminWinesComponent implements OnInit {

  displayedColumns=['id','producer','name','slug','region','varietal','vintages']
  dataSource = new MatTableDataSource<any>();

  constructor(private wineService: VinomioWineService) { }

  ngOnInit(): void {
    this.wineService.get().subscribe(data => {
      this.dataSource.data = data.map(d=>
        { 
           const vintages =  d.Vintages.map((u:any) =>u.year);
           //console.log(vintages)
           return {id:d.id, name:d.name, slug:d.slug, producer:d.Producer.name, region:d.Region.name, varietal:d.MasterVarietal.name, vintages:vintages  }
        }
      );
    });
  }

}
