import {
  Component,
  EventEmitter,
  Inject,
  Input,
  LOCALE_ID,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { catchError, EMPTY, map } from 'rxjs';
import { Cellar } from 'src/app/models/Cellar';
import { AuthService } from 'src/app/services/auth.service';
import { VinomioCellarService } from 'src/app/services/vinomio-cellar.service';
import { VinomioReviewService } from 'src/app/services/vinomio-review.service';
import { Profile } from '../../models/Profile';
import { Vintage } from '../../models/Vintage';
import { plainToClass } from 'class-transformer';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { VinomioCollectionService } from 'src/app/services/vinomio-collection.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-cellar-wine-detail',
  templateUrl: './cellar-wine-detail.component.html',
  styleUrls: ['./cellar-wine-detail.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CellarWineDetailComponent implements OnInit {
  //@Input() currentUser!:Profile
  //wine!: any;
  @Output() actionEvent = new EventEmitter<{}>();

  postForm!: FormGroup;
  drunkObject: { id: number; status: string; source: string } = {
    id: 0,
    status: 'drunk',
    source: '',
  };
  _postVintageId!: number;
  showAllocated: boolean = false;
  showPending: boolean = false;
  showReviews: boolean = false;

  cellarItem!: any;
  vintages: any = [];
  vintageSelection: any = [];
  activeTab: number = 0;
  activeYear: number = 0;

  reviews: any[] = [];
  profile!: Profile;
  cellar!: Cellar;

  wineId!:number

  constructor(
    private cellarService: VinomioCellarService,
    private collectionService: VinomioCollectionService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private reviewService: VinomioReviewService,
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.profile = this.authService.getCurrentUser()
    this.cellarService
      .get(this.profile.cellar || 0)
      .pipe(
        map((data) => {
          const serialized = plainToClass(Cellar, data);
          return serialized;
        })
      )
      .subscribe((res) => (this.cellar = res));
    this.route.paramMap.subscribe((params: ParamMap) => {
        const regExp: RegExp = /^[0-9]+$/g;
        if (params.get('id') && regExp.test(params.get('id') || '')) {
          this.wineId = Number(params.get('id'))
        }
      });
  }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      review: new FormControl(''),
      publisherId: new FormControl('1'),
      vintageId: new FormControl('', [Validators.required]),
      tags: new FormArray([]),
      score: new FormControl('', [Validators.required]),
    });

    if (this.wineId && this.profile.cellar) {
      this.collectionService
        .getCollectionByWineId(this.profile.cellar, this.wineId)
        .pipe(
          map((dao) => dao),
          catchError((err) => EMPTY)
        )
        .subscribe((dao:any) => {
          //console.log(dao)
          this.cellarItem = dao[0].Vintage.Wine;
          dao.reduce((res: any, value: any) => {
            if (!res[value.Vintage.year]) {
              res[value.Vintage.year] = {
                year: value.Vintage.year,
                id: value.Vintage.id,
                allocated: [],
                pending: [],
              };
              this.vintages.push(res[value.Vintage.year]);
            }
            if (value.statusId == 'allocated') {
              this.activeTab = 0;
              this.showAllocated = true;
              res[value.Vintage.year].allocated.push(value);
            } else if (value.statusId == 'pending') {
              if (!this.showAllocated) this.activeTab = 1;
              this.showPending = true;
              res[value.Vintage.year].pending.push(value);
            }
            return res;
          }, {});
          this.activeYear = this.vintages[0].year;
          this.onVintageSelection(this.activeYear);
          //const wineId =
          const vintageId = dao[0].Vintage.id;
          //console.log(vintageId);
          this.GetReviews(this.wineId);
        });
    }
    /*this.wine = <any[]>history.state.data;
    if (this.wine) {
    }*/
  }
  GetReviews(wineId: number) {
    if (this.profile.cellar) {
      this.reviewService
        .getListByWine(wineId, { cellarId: this.profile.cellar })
        .pipe(catchError(() => EMPTY))
        .subscribe((res) => {
          //console.log(res)
          this.reviews = res;
          this.showReviews = true;
        });
    }
  }
  PurchasedOn(collectionEvent: any[]) {
    return collectionEvent.find((i) => i.action === 'PurchasedOn')?.createdAt;
  }
  Segment(locationId: string) {
    const value = this.cellar
      .Partitions()
      .find((i) => i.id === locationId)?.segment;
    return value ? value : 'None';
  }
  Location(locationId: string) {
    return this.cellar.Partitions().find((i) => i.id === locationId)?.name;
  }
  isDisabled(item: number) {
    return false;
  }
  isActive(item: number) {
    return this.activeTab == item;
  }
  onSelection(id: number) {
    this.activeTab = id;
    this.onVintageSelection(this.activeYear);
  }
  onDeleteItem(item: any) {
    this.drunkObject.id = item.id;
    this.drunkObject.status = this.activeTab == 1 ? 'deleted' : this.drunkObject.status
    this.actionEvent.emit({ id: 'delete', data: item });
  }
  onEditItem(item: any) {
    this.actionEvent.emit({ id: 'edit', data: item });
  }
  onRelocateItem(item: any) {
    this.actionEvent.emit({ id: 'relocate', data: item });
  }
  onPostVintageSelection(event: any) {
    this.postForm.patchValue({ vintageId: <number>event.value });
  }
  onVintageSelection(Year: any) {
    this.activeYear = Year;
    const filtered = this.vintages.filter((i: any) => i.year == Year);

    if(filtered[0]?.allocated.length == 0 && filtered[0]?.pending.length == 0){
      this.vintages = this.vintages.filter((i:any) => i.year != Year)
      if(this.vintages.length != 0)
        this.onVintageSelection(this.vintages[0].vintage)
    }
    
    if (this.activeTab == 0)
        this.vintageSelection = filtered.map((i: any) => i?.allocated)[0];
    else if (this.activeTab == 1)
        this.vintageSelection = filtered.map((i: any) => i?.pending)[0];
    else this.vintageSelection = [];
    
  }
  onGoBack() {
    
  }
  PostNote(note: HTMLDivElement) {
    this.postForm.patchValue({ review: note.textContent });
    this.reviewService
      .add(this.postForm.value)
      .pipe(catchError(() => EMPTY))
      .subscribe(() => {
        this.GetReviews(this.wineId);
        note.textContent = '';
      });
  }
  onDeleteVintage() {
    const data = { statusId: this.drunkObject.status , actionDate:  `${formatDate(Date.now(), 'yyyy-MM-dd HH:mm:ss', this.locale)}` }
    
    this.collectionService
      .put(this.drunkObject.id, data)
      .pipe(catchError(() => EMPTY))
      .subscribe(() => {
        this.vintages
          .filter((v: any) => v.year == this.activeYear)
          .map((vintage: any) => {
            if (this.activeTab == 0)
              vintage.allocated = vintage.allocated.filter(
                (i: any) => i.id != this.drunkObject.id
              );
            else if (this.activeTab == 1)
              vintage.pending = vintage.pending.filter(
                (i: any) => i.id != this.drunkObject.id
              );
            this.onVintageSelection(this.activeYear);
            
            //console.log(this.vintages)

            if(this.vintages.length == 0)
              this.router.navigateByUrl('/cellar')
          });
      });
  }
  Message() {
    //console.log( this.vintageSelection)
    return 'Tell me what you think about this wine?';
  }
}
