import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, map, Observable, of, OperatorFunction, Subject, switchMap } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-model-searcher',
  templateUrl: './admin-model-searcher.component.html',
  styleUrls: ['./admin-model-searcher.component.css']
})
export class AdminModelSearcherComponent implements OnInit {
  
  @Input() showing!:{limit:number, count:number}
  @Input() noMatch!:string
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
      //this.formGroup.controls.name.clearValidators();
  }
  public get setStyles(){
    return this.noMatch === 'true' ? {'border-style':'solid','border-color':'red'} : {}
  }
  onClear(){
    this.adminForm.patchValue({name:''})
    this.searchEvent.emit(this.adminForm.value.name)
  }
  onNextPage(){
    //this.searchEvent.emit()
  }
}
