import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged, filter, map, Observable, OperatorFunction, startWith, Subject } from 'rxjs';
import { People } from 'src/app/models/People';
import { Wine } from 'src/app/models/Wine';
import { AuthService } from 'src/app/services/auth.service';
import { VinomioPeopleService } from 'src/app/services/vinomio-people.service';
import { VinomioReviewService } from 'src/app/services/vinomio-review.service';
import { VinomioTagService } from 'src/app/services/vinomio-tag.service';
import { VinomioVintageService } from 'src/app/services/vinomio-vintage.service';

@Component({
  selector: 'app-admin-review-form',
  templateUrl: './admin-review-form.component.html',
  styleUrls: ['./admin-review-form.component.css']
})
export class AdminReviewFormComponent implements OnInit {

  adminForm!:FormGroup
  winesearcher!: OperatorFunction<string, readonly Wine[]>;
  peoplesearcher!: OperatorFunction<string, readonly People[]>;
  routeBack:string
  
  tags:any[]=[]
  subject: Subject<any> = new Subject();

  constructor(
    private router:Router,
    private authService: AuthService,
    private vintageService: VinomioVintageService,
    private peopleService: VinomioPeopleService,
    private reviewService: VinomioReviewService,
  ) { 
    this.initForm()
    this.routeBack ='/admin/review'
  }
  initForm(){
    this.adminForm = new FormGroup({
      publisher : new FormControl(), 
      vintage : new FormControl(),
      review : new FormControl(),
      score: new FormControl(),
    })
  }
  ngOnInit(): void {
    this.subject
    .pipe(debounceTime(500))
    .subscribe((tags:any[]) => {
          tags.forEach((tag) => {
            let hashtagItem = this.tags.filter(i=> i.id == tag.id);
            if(hashtagItem.length == 0) this.tags.push(tag)
            else{
              hashtagItem[0].name = tag.name
            }
          })
        }
    );
  }
  onSubmit(){
    const data = {
      review: this.adminForm.get("review")?.value,
      publisherId: this.adminForm.get("publisher")?.value.id,
      vintageId: this.adminForm.get("vintage")?.value.id,
      tags: this.tags.map(i => {return {"name":i.name}}),
      score: this.adminForm.get("score")?.value
    }
    //console.debug(data)
    this.reviewService.add(data).subscribe((p)=>this.router.navigate(['/admin/review']))
  }
  onReviewerFilterList():void{
    let results:any[]=[]
    this.peoplesearcher = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      startWith(''),
      filter((i) => i.length > 0),
      map((searchText: string ) => {
        this.peopleService.getByName(searchText).subscribe((res:any) => results=res)
        return results
      }),
      catchError((e)=>{ console .log(e); return []})
    )
  }
  onWineFilterList():void {
    let results:any[]=[]
    this.winesearcher = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      startWith(''),
      filter((i) => i.length > 0),
      map((searchText: string ) => {
        this.vintageService.getByWineName(searchText).subscribe((res:any) => results=res)
        return results
      }),
      catchError((e)=>{ console.debug(e); return []})
    )
  }
  resultFormatListValue(value: any) {
    if(value.year)
      return `${value.year} ${value.Wine.name}`;
    else
      return value.name
  }
  inputFormatListValue(value: any) {
    if (value.year) return `${value.year} ${value.Wine.name}`;
    return value.name;
  }
  onClear() {
    this.initForm()
  }
  onSearchSelection(selection: any) {
    const wineselection: any = {
      id: selection.item.id,
      name: selection.item.name,
    };
  }
  onKeyUp(event:any){
    let tagsFound:any[] = []
    if(event.key == "Shift" || <string>event.key.includes("Arrow")) return 
    const content:string = event.target.innerText
    const regexp = /\B#[^ !@#$%^&*(),.?":{}|<>]+/g;
    const array = [...content.matchAll(regexp)];
    array.forEach((tag,index)=> { 
      let name = tag[0]
      let tagInfo={id:index,name:name.trim()}
      tagsFound.push(tagInfo);
    })
    if(tagsFound.length>0){
      this.subject.next(tagsFound)
      this.tags = tagsFound
    }
    if(array.length == 0 && this.tags.length > 0)
      this.tags = []
    this.adminForm.patchValue({review:content})
  }
  onAddMe(){
    const user = this.authService.getCurrentUser();
    console.debug(user)
  }
}
