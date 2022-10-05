import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { People } from 'src/app/models/People';

@Component({
  selector: 'app-admin-people-form',
  templateUrl: './admin-people-form.component.html',
  styleUrls: ['./admin-people-form.component.css']
})
export class AdminPeopleFormComponent implements OnInit {
  submitted = false;
  adminForm!: FormGroup;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.adminForm = new FormGroup({
      name:  new FormControl('',[Validators.required,Validators.minLength(0)]),
      role:  new FormControl('',[Validators.required,Validators.minLength(0)]),
      handler:  new FormControl('',[Validators.minLength(0)]),
    })
  }
  showFormControls(form: any) {
    return form && form.controls.name &&
    form.controls.name.value; // Dr. IQ
  }
  onSubmit() { }
}
