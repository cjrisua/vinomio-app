import { Component, OnInit, ViewChild, Input, SimpleChange, Output, EventEmitter  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Vintage } from 'src/app/models/Vintage';

export interface UsersData {
  rowId: number;
  name: string;
  id: number;
  vintage:number;
  bottleCount: number;
  format:string;
}

const ELEMENT_DATA: UsersData[] = [];

@Component({
  selector: 'app-cellar-add-bulk-table',
  templateUrl: './cellar-add-bulk-table.component.html',
  styleUrls: ['./cellar-add-bulk-table.component.css']
})
export class CellarAddBulkTableComponent implements OnInit {

  displayedColumns: string[] = ['bottleCount','vintage','name', 'price', 'format', 'action'];
  dataSource = ELEMENT_DATA;
  _currentRowCount:number = 0;

  @ViewChild(MatTable, { static: true })
  table!: MatTable<any>;
  @Output() newItemEvent = new EventEmitter<any>();
  
  @Input() events!: Observable<Vintage>;
  private eventsSubscription!: Subscription;
 

  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.eventsSubscription = this.events.subscribe((vintage) => this.addRowData(vintage));
  }
  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
  tableActionEvent() {
    console.debug("tableActionEvent")
    this.newItemEvent.emit(this.dataSource);
  }
  
  openDialog(action: any,obj: { action: any; }) {
    /*obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });*/
  }
  addRowData(vintage: Vintage)
  {
    //console.debug(JSON.stringify(vintage))
    if(this.dataSource.some(i => i.id == vintage.id))
      this.IncreaseRowData(this.dataSource.filter((i) => i.id == vintage.id)[0])
    else
      this.dataSource.push({rowId:this._currentRowCount++, id:vintage.id, bottleCount: 1, format:"750ml", vintage:vintage.year ,name:vintage.Wine.name})
    
    this.table.renderRows();
    this.tableActionEvent()
  }
  IncreaseRowData(row_obj: { rowId: number; bottleCount: number; }){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.rowId == row_obj.rowId){
        value.bottleCount = row_obj.bottleCount + 1;
      }
      return true;
    });
  }
  updateRowData(row_obj: { id: number; name: string; }){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.name = row_obj.name;
      }
      return true;
    });
  }
  deleteRowData(row_obj: { rowId: number;  bottleCount: number;}){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.rowId == row_obj.rowId && value.bottleCount > 1){
          value.bottleCount = row_obj.bottleCount - 1;
          return true;
      }
      else
        return value.rowId != row_obj.rowId;
    });
    this.tableActionEvent();
  }
}

