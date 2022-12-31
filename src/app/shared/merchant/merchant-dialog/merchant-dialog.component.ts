import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CellarAddWineComponent } from 'src/app/cellar/cellar-add-wine/cellar-add-wine.component';
import { VinomioMerchantService } from 'src/app/services/vinomio-merchant.service';

@Component({
  selector: 'app-merchant-dialog',
  templateUrl: './merchant-dialog.component.html',
  styleUrls: ['./merchant-dialog.component.css']
})
export class MerchantDialogComponent implements OnInit {

  merchantForm!:FormGroup
  constructor(
    public dialogRef: MatDialogRef<CellarAddWineComponent>,
    private merchantService: VinomioMerchantService,
    @Inject(MAT_DIALOG_DATA) public data:{id:number}
  ) { }

  ngOnInit(): void {
    this.merchantForm = new FormGroup({
      name: new FormControl('',[Validators.required])
    })
  }
  onSubmit(){
    const data={userId:this.data.id, name:this.merchantForm.value.name}
    this.merchantService.add(data).subscribe((data) => this.dialogRef.close(data))
    //this.dialogRef.close()
  }
}
