import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, map, Observable, of, OperatorFunction, Subject, switchMap } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-model-searcher',
  templateUrl: './admin-model-searcher.component.html',
  styleUrls: ['./admin-model-searcher.component.css']
})
export class AdminModelSearcherComponent implements OnInit {

  @Output() searchEvent = new EventEmitter<any>();
  search!: OperatorFunction<string, readonly any[]>;
  adminForm!: FormGroup;
  subject: Subject<any> = new Subject();
  
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.adminForm = new FormGroup({
      name: new FormControl('', [
        Validators.minLength(3),
      ])})
    this.subject
            .pipe(debounceTime(500))
            .subscribe(() => {
                    this.searchEvent.emit(this.adminForm.value.name)
                }
    );
  }
  onKeyUp(): void {
    this.subject.next('');
  }

  onKeyDown(): void {
    //console.log("%")
      // When the user starts to type, remove the validator
      //this.formGroup.controls.name.clearValidators();
      
  }
  onClear(){
    this.adminForm.patchValue({name:''})
    this.searchEvent.emit(this.adminForm.value.name)
  }
}
