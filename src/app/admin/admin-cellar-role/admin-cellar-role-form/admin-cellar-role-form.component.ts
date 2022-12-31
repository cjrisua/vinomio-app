import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/Role';
import { VinomioRoleService } from 'src/app/services/vinomio-role.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-cellar-role-form',
  templateUrl: './admin-cellar-role-form.component.html',
  styleUrls: ['./admin-cellar-role-form.component.css']
})
export class AdminCellarRoleFormComponent implements OnInit {

  roleForm!: FormGroup;
  submitted = false;
  role!: Role
  roles:any=[
    {id:"admin",name:"Admin"},
    {id:"collector",name:"Collector"},
    {id:"observer",name:"Observer"},
  ]
  constructor(
    private route:Router,
    private location: Location,
    private service:VinomioRoleService
  ) { }

  ngOnInit(): void {
    const state: any = this.location.getState();
    if(state.id)
      this.role=state

    this.roleForm = new FormGroup({
      name:  new FormControl('',[Validators.required,Validators.minLength(3)]),
    })

    if(this.role){
      this.roleForm.patchValue({
        id: this.role.id,
        name: this.role.name,
      });
    }
  }
  showFormControls(form: any) {
    return form && form.controls.name &&
    form.controls.name.value; // Dr. IQ
  }
  onSubmit() { 
    let data={"name":this.roleForm.value.name.trim()}
    if(this.role)
     this.service.put(this.role.id,data).subscribe((response) => this.route.navigateByUrl('/admin/role'));
    else
     this.service.add(data).subscribe((response) => this.route.navigateByUrl('/admin/role'));
 
   }
   onRoleChange(event:any){}
}
