import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, Subject } from 'rxjs';
import { MasterVarietal } from '../../models/MasterVarietal';
import { VinomioMastervarietalService } from '../../services/vinomio-mastervarietal.service';

@Component({
  selector: 'app-admin-mastervarietal',
  templateUrl: './admin-mastervarietal.component.html',
  styleUrls: ['./admin-mastervarietal.component.css'],
})
export class AdminMastervarietalComponent implements OnInit {
  modelName = 'Master Varietal';
  displayedColumns = ['id', 'name', 'varieties'];
  exclusionColumns = ['varieties'];
  dataSource = new MatTableDataSource<MasterVarietal>();
  model$!: Observable<any>;
  clearForm = new Subject()

  constructor(
    private mastervarietalService: VinomioMastervarietalService,
    private router: Router
  ) {
    this.model$ = this.mastervarietalService.get().pipe(
      map((data: any[]) => (this.dataSource.data = data)),
      map(() => this.modelName),
      catchError(() => of([]))
    );
  }
  ngOnInit(): void {
    //this.getSourceData()
  }
  private getSourceData(text?: string) {
    this.mastervarietalService.get(text).pipe(
      catchError(()=>of([]))
    ).subscribe((data) => {
      this.dataSource.data = data;
    });
  }
  public searchEvent(keyword: string) {
    this.getSourceData(keyword);
  }
  public ViewOrDeleteModelItem(wine: any) {
    if (wine.action == 'view')
      this.router.navigateByUrl('/admin/mastervarietal/' + wine.event.id, {
        state: wine.event,
      });
    else if (wine.action == 'delete')
      this.mastervarietalService.delete(wine.event.id).subscribe(() => {
          this.clearForm.next('')
          this.getSourceData()
        });
  }
  public get showing() {
    return {
      limit: this.dataSource.data.length,
      count: this.mastervarietalService.count,
    };
  }
}
