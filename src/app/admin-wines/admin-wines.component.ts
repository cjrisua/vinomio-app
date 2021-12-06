import { Component, OnInit } from '@angular/core';
import { VinomioWineService } from '../services/vinomio-wine.service';
import { Wine } from '../models/Wine';

@Component({
  selector: 'app-admin-wines',
  templateUrl: './admin-wines.component.html',
  styleUrls: ['./admin-wines.component.css']
})
export class AdminWinesComponent implements OnInit {

  wines!: any;
  constructor(private wineService: VinomioWineService) { }

  ngOnInit(): void {
    this.wineService.getAll().subscribe(data => {
      console.log(data);
      this.wines =data;
      });
  }

}
