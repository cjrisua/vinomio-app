import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CellarAddWineComponent } from 'src/app/cellar/cellar-add-wine/cellar-add-wine.component';
import { Merchant } from 'src/app/models/Merchant';
import { VinomioAllocationService } from 'src/app/services/vinomio-allocation.service';

export enum AllocationStatusEnum {
  Active = "Active",
  Inactive = "Inactive",
  Waiting = "Waiting",
}

@Component({
  selector: 'app-allocation-dialog-add',
  templateUrl: './allocation-dialog-add.component.html',
  styleUrls: ['./allocation-dialog-add.component.css']
})
export class AllocationDialogAddComponent implements OnInit {

  allocationForm!:FormGroup
  enumKeys: any[] = [];
  status = AllocationStatusEnum;

  constructor(
    public dialogRef: MatDialogRef<CellarAddWineComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Merchant,
    public allocationService: VinomioAllocationService,
    @Inject(LOCALE_ID) private locale: string
  ) { }

  ngOnInit(): void {
    this.enumKeys = Object.keys(this.status).map(f =>f);
    this.allocationForm = new FormGroup({
      merchantId: new FormControl(this.data.id,[]),
      name: new FormControl(this.data.name,[Validators.required]),
      status: new FormControl(AllocationStatusEnum.Active,[Validators.required]),
      memberSince: new FormControl(`${formatDate(Date.now(),'yyyy-MM-dd',this.locale)}`,[Validators.required]),
      lastPurchase: new FormControl(`${formatDate(Date.now(),'yyyy-MM-dd',this.locale)}`,[])
    })
  }
  onChange(event:Event){

  }
  onSubmit(){
    this.allocationService.add(this.allocationForm.value)
    .subscribe((result) => this.dialogRef.close(result))
  }
}
