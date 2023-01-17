import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, filter, map, Observable, OperatorFunction, startWith, Subject } from 'rxjs';
import { People } from 'src/app/models/People';
import { Review } from 'src/app/models/Review';
import { Tag } from 'src/app/models/Tag';
import { Wine } from 'src/app/models/Wine';
import { AuthService } from 'src/app/services/auth.service';
import { VinomioPeopleService } from 'src/app/services/vinomio-people.service';
import { VinomioReviewService } from 'src/app/services/vinomio-review.service';
import { VinomioVintageService } from 'src/app/services/vinomio-vintage.service';
import { ErrorDialogService } from 'src/app/shared/errors/error-dialog.service';

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
  
  //tags:any[]=[]
  subject: Subject<any> = new Subject();

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private vintageService: VinomioVintageService,
    private peopleService: VinomioPeopleService,
    private reviewService: VinomioReviewService,
    private errorHandlerService: ErrorDialogService,
    private fb: FormBuilder
  ) { 
    this.initForm()
    this.routeBack ='/admin/review'
  }
  debug(){
    console.debug(this.adminForm.value)
  }
  initForm(){
    this.adminForm = new FormGroup({
      id: new FormControl(0),
      publisher : new FormControl(), 
      vintage : new FormControl(),
      review : new FormControl(),
      score: new FormControl(),
      tags: new FormArray([])
    })
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const regExp: RegExp = /^[0-9]+$/g;
      if (params.get('id') && regExp.test(params.get('id') || '')) {
        this.reviewService.getById(Number(params.get('id'))).pipe(
          catchError(exception => {
            this.errorHandlerService.openDialog(exception?.error.message  || 'Undefined client error',exception?.status)
            return EMPTY
          }))
          .subscribe((ReviewDao:Review)=> {
             ReviewDao.tags?.filter(i => i.id).map(i => this.fb.group(i)).map(fg => (<FormArray>this.adminForm.get('tags')).push(fg))
             this.adminForm.patchValue({
              id:ReviewDao.id,
              publisher:ReviewDao.people,
              vintage:ReviewDao.vintage,
              score:ReviewDao.score,
              review:ReviewDao.message,
            });
          })
        } 
    });

    this.subject
    .pipe(debounceTime(500))
    .subscribe((tags:any[]) => {
          tags.forEach((tag) => {
            /*
            let hashtagItem = this.tags.filter(i=> i.id == tag.id);
            if(hashtagItem.length == 0) this.tags.push(tag)
            else{
              hashtagItem[0].name = tag.name
            }*/
            console.debug(tag)
          })
        }
    );
  }
  onSubmit(){
    const data = {
      id: Number(this.adminForm.get("id")?.value),
      review: this.adminForm.get("review")?.value,
      publisherId: this.adminForm.get("publisher")?.value.id,
      vintageId: this.adminForm.get("vintage")?.value.id,
      tags: this.mapTags(this.adminForm.get('tags') as FormArray),
      score: Number(this.adminForm.get("score")?.value) || 0
    }
    //console.log(data)
   if(data?.id)
      this.reviewService.update(data.id,data).subscribe((p)=>this.router.navigate(['/admin/review']))
    else
      this.reviewService.add(data).subscribe((p)=>this.router.navigate(['/admin/review']))
  }
  private parseContentForTags(content:string) : {name:string,flag:string,id?:number}[]{
    var tagsFound:{name:string,flag:string}[] = []
    const regexp = /\B#[^ !@#$%^&*(),.?":{}|<>]+/g;
    const array = [...content.matchAll(regexp)];
    array.forEach((tag,index)=> { 
      const name:string = tag[0].toString().trim()
      tagsFound.push({name:name,flag:"new"});
    })
    return tagsFound
  }
  private mapTags(formArray:FormArray){
    //get tags form reactive form object
    const existentTags = formArray.value;
    //get tags from textarea and assume everything is a new tag
    const reviewTags = this.parseContentForTags(this.adminForm.get('review')?.value)
    //mark tags which can be ignored
    const updatedTags = existentTags.map((i:any) => {
        const item = reviewTags.find((o:any)=> o.name===i.name) 
        return {name:i.name, flag:item ? "ignore" : "remove", id:i.id}})
    //merge objects
    const results = [...reviewTags,...updatedTags]
    //reduce data for api with new and remove only 
    return results.reduce((r:{name:string,flag:string,id?:number}[],a) => { 
      //console.log(a)
      const index = r.findIndex((i:any)=>i.name===a.name)
      if(index == -1)
        r.push(a)
      else if(a.flag=="ignore"){
        r[index].flag = a.flag
        r[index].id = a.id
      }
      return r
    },[])
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
      catchError((e)=>{ console.error(e); return []})
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
    /*
    let tagsFound:any[] = []
    if(event.key == "Shift" || <string>event.key.includes("Arrow")) return 
    const content:string = event.target.innerText
    const regexp = /\B#[^ !@#$%^&*(),.?":{}|<>]+/g;
    const array = [...content.matchAll(regexp)];
    array.forEach((tag,index)=> { 
      console.log("?")
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
    //this.adminForm.patchValue({review:content})*/
  }
  onAddMe(){
    const user = this.authService.getCurrentUser();
    console.debug(user)
  }
}
