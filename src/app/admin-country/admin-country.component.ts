import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Country } from '../models/Country';
import { VinomioCountryService } from '../services/vinomio-country.service';

@Component({
  selector: 'app-admin-country',
  templateUrl: './admin-country.component.html',
  styleUrls: ['./admin-country.component.css']
})
export class AdminCountryComponent implements OnInit {

  displayedColumns=['id','name','slug']
  exclusionColumns=[]
  dataSource = new MatTableDataSource<Country>();

  constructor(
    private router:Router,
    private countryService: VinomioCountryService
  ) { }

  ngOnInit(): void {
    this.countryService.get().subscribe((data) => {
      this.dataSource.data = data;
    });
  }
  public ViewOrDeleteModelItem(item: any) {
    console.log(`naviage to id ${JSON.stringify(item.event)}`);
    if(item.action=='view')
      this.router.navigateByUrl('/admin/country/' + item.event.id, { state: item.event });
    else if(item.action=='delete')
      this.countryService.delete(item.event.id).subscribe(() => this.ngOnInit())
  }

}
