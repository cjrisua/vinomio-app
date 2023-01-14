import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Vintage } from 'src/app/models/Vintage';
import { VinomioVintageService } from 'src/app/services/vinomio-vintage.service';

@Component({
  selector: 'app-main-searcher',
  templateUrl: './main-searcher.component.html',
  styleUrls: ['./main-searcher.component.css']
})
export class MainSearcherComponent implements OnInit {
  Control = new FormControl();
  //options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<Vintage[]> | undefined;
  openDropMenu: boolean = false;

  //eventsSubject: Subject<Vintage> = new Subject<Vintage>();

  vintages!:Vintage[]

  @Output() wineEvent = new EventEmitter<Vintage>();

  constructor(private wine: VinomioVintageService) { }

  ngOnInit(): void {

    this.wine.get()
    .pipe(
      map((d: Vintage[])=>d))
    .subscribe(data => (this.onVintage(data)));
    /*
    this.filteredOptions = this.Control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );*/
  }
  
  displayFn(vintage: Vintage):string {
    return vintage && vintage.Wine.name ? `${vintage.year} ${vintage.Wine.name}` : ''
  }
  onVintage(data:Vintage[]){
    this.vintages = data
    this.filteredOptions = this.Control.valueChanges
      .pipe(
        startWith(''),
        map(value => { 
          const results = value.length >= 1 ? this._filter(value) :  
          this.vintages; 
          //console.log(results); 
          return results
        } )
      );
  }
  wineSelection(value:any){
    //console.debug(value.option.value as Vintage)
    this.wineEvent.emit(value.option.value as Vintage)
  }
  //onChange(event:any){
    //console.log(event)
    //this.wineSelection.emit(event.source.value)
    //this.eventsSubject.next(event.source.value)
  //}
  private _filter(value: string) : Vintage[] {
    const filterValue = value.toLowerCase();
    return this.vintages.filter(option => option.Wine.name.toLowerCase().includes(filterValue));
  }
}
