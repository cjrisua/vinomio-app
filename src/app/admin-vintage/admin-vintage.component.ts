import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Vintage } from '../models/Vintage';
import { VinomioVintageService } from '../services/vinomio-vintage.service';

@Component({
  selector: 'app-admin-vintage',
  templateUrl: './admin-vintage.component.html',
  styleUrls: ['./admin-vintage.component.css']
})
export class AdminVintageComponent implements OnInit {
  displayedColumns=['id','year','Wine.name']
  dataSource = new MatTableDataSource<Vintage>();
  exclusionColumns = ['wineId','year'];
  constructor(
    private vintageService: VinomioVintageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.vintageService.get().subscribe((data) => {
      //this.dataSource.data = data;
      
      this.dataSource.data = data.map(m => {
        //console.log(JSON.stringify(m))
        m['name']= `${m.year} ${m.Wine.name}`
        return m;
      })
    });
  }
  public ViewOrDeleteModelItem(wine: any) {
    if(wine.action=='view')
    this.router.navigateByUrl('/admin/vintage/' + wine.event.id, { state: wine.event });
  else if(wine.action=='delete')
    this.vintageService.delete(wine.event.id).subscribe(() => this.ngOnInit())
  }

}
