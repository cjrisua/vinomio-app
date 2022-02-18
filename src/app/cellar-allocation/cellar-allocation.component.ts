import { Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Allocation } from '../models/Allocation';
import { Profile } from '../models/Profile';
import { VinomioAllocationService } from '../services/vinomio-allocation.service';
import { CellarAllocationEventComponent } from './cellar-allocation-event/cellar-allocation-event.component';

@Component({
  selector: 'app-cellar-allocation',
  templateUrl: './cellar-allocation.component.html',
  styleUrls: ['./cellar-allocation.component.css']
})
export class CellarAllocationComponent implements OnInit {

  @Input() profile!:Profile
  displayedColumns=['id','name','status','memberSince','lastPurchase','action']
  dataSource = new MatTableDataSource<Allocation>();
  isShow:boolean = true;
  status!:string
  //@ViewChild('appendHere',{ static: false, read: ViewContainerRef}) target!: ViewContainerRef
  private componentRef!: ComponentRef<any>;
  
  constructor(
    private allocation:VinomioAllocationService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit(): void {
      this.allocation.get(this.profile.id)
      .subscribe(results => this.dataSource.data = results);
      this.status = "show"
  }
  addNewComponent(event:any,data:any){
    console.debug(JSON.stringify(data));
    const row = document.getElementsByClassName("row"+event)[0];
    if(row.hasAttribute("selected")){
      row.getElementsByClassName("status")[0].innerHTML="show"
      row.removeAttribute("selected")
      row.nextSibling?.remove();
      return;
    }
    row.getElementsByClassName("status")[0].innerHTML="hide" 
    row.setAttribute("selected","")

    let childComponent = this.componentFactoryResolver.resolveComponentFactory(CellarAllocationEventComponent);
    this.componentRef = this.viewContainerRef.createComponent(childComponent);

    this.componentRef.instance.MerchantId = data.merchantId
    const loaderComponentElement = this.componentRef.location.nativeElement;
    row.after((<HTMLElement>loaderComponentElement).children[0])
  }
}
