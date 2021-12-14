import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MasterVarietal } from '../models/MasterVarietal';
import { VinomioMastervarietalService } from '../services/vinomio-mastervarietal.service';

@Component({
  selector: 'app-admin-mastervarietal',
  templateUrl: './admin-mastervarietal.component.html',
  styleUrls: ['./admin-mastervarietal.component.css']
})
export class AdminMastervarietalComponent implements OnInit {

  displayedColumns=['id','name','varieties']
  dataSource = new MatTableDataSource<MasterVarietal>();
  
  constructor(
    private mastervarietalService: VinomioMastervarietalService
  ) { }

  ngOnInit(): void {
    this.mastervarietalService.get().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

}
