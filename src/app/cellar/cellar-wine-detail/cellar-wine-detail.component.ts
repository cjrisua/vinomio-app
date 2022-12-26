import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, map } from 'rxjs';
import { Cellar } from 'src/app/models/Cellar';
import { AuthService } from 'src/app/services/auth.service';
import { VinomioCellarService } from 'src/app/services/vinomio-cellar.service';
import { VinomioReviewService } from 'src/app/services/vinomio-review.service';
import { Profile } from '../../models/Profile';
import { Vintage } from '../../models/Vintage';
import { plainToClass } from 'class-transformer';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cellar-wine-detail',
  templateUrl: './cellar-wine-detail.component.html',
  styleUrls: ['./cellar-wine-detail.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CellarWineDetailComponent implements OnInit {
  //@Input() currentUser!:Profile
  wine!: any;
  @Output() actionEvent = new EventEmitter<{}>();

  postForm!: FormGroup;
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

  constructor(
    private cellarService: VinomioCellarService,
    private authService: AuthService,
    private router: Router,
    private reviewService: VinomioReviewService
  ) {
    this.profile = this.authService.getCurrentUser();
    this.cellarService
      .get(this.profile.cellar || 0)
      .pipe(
        map((data) => {
          const serialized = plainToClass(Cellar, data);
          return serialized;
        })
      )
      .subscribe((res) => (this.cellar = res));
  }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      review: new FormControl(''),
      publisherId: new FormControl('1'),
      vintageId: new FormControl('', [Validators.required]),
      tags: new FormArray([]),
      score: new FormControl('', [Validators.required]),
    });
    this.wine = <any[]>history.state.data;
    if (this.wine) {
      this.cellarItem = this.wine[0].Vintage.Wine;
      this.wine.reduce((res: any, value: any) => {
        //console.log(value.Vintage)
        if (!res[value.Vintage.year]) {
          res[value.Vintage.year] = {
            year: value.Vintage.year,
            id: value.Vintage.id,
            allocated: [],
            pending: [],
          };
          this.vintages.push(res[value.Vintage.year]);
        }
        //res[value.Vintage.year].qty.push(value);
        //allocated
        if (value.statusId == 'allocated') {
          this.showAllocated = true;
          res[value.Vintage.year].allocated.push(value);
        } else if (value.statusId == 'pending') {
          this.showPending = true;
          res[value.Vintage.year].pending.push(value);
        }
        return res;
      }, {});
      this.activeYear = this.vintages[0].year;
      this.onVintageSelection(this.activeYear);
      //const wineId =
      const vintageId = this.wine[0].Vintage.id;
      //console.log(vintageId);
      this.GetReviews(this.wine[0].Vintage.Wine.id);
    }
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
    return collectionEvent.find((i) => i.action === 'PurchasedOn').createdAt;
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
    //console.log(this.vintages)
    const filtered = this.vintages.filter((i: any) => i.year == Year);
    if (this.activeTab == 0)
      this.vintageSelection = filtered.map((i: any) => i.allocated)[0];
    else if (this.activeTab == 1)
      this.vintageSelection = filtered.map((i: any) => i.pending)[0];
    else this.vintageSelection = [];
  }
  onGoBack() {
    //this.actionEvent.emit({id:"back", data:this.wine[0].Vintage.Wine.id})
  }
  PostNote(note: HTMLDivElement) {
    //console.log(this.profile)
    //console.log(note.textContent)
    //note.textContent="";
    this.postForm.patchValue({ review: note.textContent });
    this.reviewService
      .add(this.postForm.value)
      .pipe(catchError(() => EMPTY))
      .subscribe(() => {
        this.GetReviews(this.wine[0].Vintage.Wine.id);
        note.textContent = '';
      });
  }
  Message() {
    //console.log( this.vintageSelection)
    return 'Tell me what you think about this wine?';
  }
}
