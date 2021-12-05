import { Component, OnInit } from '@angular/core';
import { VinomioWineService } from '../service/vinomiowine.service';
import { Wine } from '../models/Wine';

@Component({
  selector: 'app-admin-wines',
  templateUrl: './admin-wines.component.html',
  styleUrls: ['./admin-wines.component.css']
})
export class AdminWinesComponent implements OnInit {

  wines!: Wine[];
  constructor(private wineService: VinomioWineService) { }

  ngOnInit(): void {
    this.wineService.getAll().subscribe(data => {
        this.wines =data;
      });
  }

}
