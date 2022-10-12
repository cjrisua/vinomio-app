import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { People } from 'src/app/models/People';
import { VinomioPeopleService } from 'src/app/services/vinomio-people.service';

@Component({
  selector: 'app-admin-people-form',
  templateUrl: './admin-people-form.component.html',
  styleUrls: ['./admin-people-form.component.css'],
})
export class AdminPeopleFormComponent implements OnInit {
  submitted = false;
  adminForm!: FormGroup;
  id: string = '';
  data!: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private peopleService: VinomioPeopleService
  ) {}

  ngOnInit(): void {
    this.adminForm = new FormGroup({
      name: new FormControl(this.data?.name, [
        Validators.required,
        Validators.minLength(0),
      ]),
      role: new FormControl(this.data?.role, [
        Validators.required,
        Validators.minLength(0),
      ]),
      handler: new FormControl(this.data?.handler, [Validators.minLength(0)]),
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      const regExp: RegExp = /^[0-9]+$/g;
      if (params.get('id') && regExp.test(params.get('id') || '')) {
        this.peopleService
          .getById(Number(params.get('id')))
          .subscribe((res) => {
            this.adminForm.patchValue({
              name: res.name,
              role: res.role,
              handler: res.handler,
            });
          });
      }
    });
  }
  showFormControls(form: any) {
    return form && form.controls.name && form.controls.name.value; // Dr. IQ
  }
  onSubmit() {
    this.peopleService.add(this.adminForm.value).subscribe((res) => {
      if (res.status == 201) this.router.navigate(['/admin/people']);
    });
  }
}
