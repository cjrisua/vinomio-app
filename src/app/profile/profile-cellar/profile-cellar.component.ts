import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { fromEventPattern } from 'rxjs';
import { Cellar } from 'src/app/models/Cellar';
import { Profile } from 'src/app/models/Profile';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { VinomioCellarService } from 'src/app/services/vinomio-cellar.service';

export const slugify = (str: string): string =>
  str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
export interface CellarAttribute {
  key: string;
  value: string;
  readonly: boolean;
  type: any;
  slug?: any;
}
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
function createObject<K extends string, T extends {}>(keyName: K, details: T) {
  return { [keyName]: details } as Record<K, T>;
}
@Component({
  selector: 'app-profile-cellar',
  templateUrl: './profile-cellar.component.html',
  styleUrls: ['./profile-cellar.component.css'],
})
export class ProfileCellarComponent implements OnInit {
  profile!: Profile;

  userCellar!: Cellar;
  owner!: User;
  cellarForm!: FormGroup;
  features: CellarAttribute[] = [];
  distributions: { country: string; count: string }[] = [];
  partitions: { name: string; segment: string; count: string }[] = [];

  CellarAttributes = [
    { key: 'Capacity' },
    { key: 'size' },
    { key: 'Name' },
    { key: 'Partition', type: 'Toggle' },
    { key: 'Bins', type: 'Toggle' },
    { key: 'Distribution', type: 'Toggle' },
  ];
  _showAddStatus: boolean = true;

  constructor(
    private cellarService: VinomioCellarService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.profile = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    this.cellarForm = new FormGroup({
      id: new FormControl(),
      createdAt: new FormControl(),
      owner: new FormControl(),
      attributes: new FormArray([]),
    });
    const cellarid: number = this.profile.cellar || 0;
    this.cellarService.get(cellarid).subscribe((res) => {
      this.userCellar = res;
      this._initAttributes();
      this.owner = this.userCellar.Users.filter(
        (user) => user.Subscribers?.role_id == 1
      )[0];
      this.cellarForm.patchValue({
        id: res.id,
        createdAt: res.createdAt,
        owner: `${this.owner.firstName} ${this.owner.lastName}`,
      });
      Object.keys(this.userCellar.attributes).forEach((attrKey) => {
        let data:any
        let container:any
        if (Array.isArray((<any>this.userCellar.attributes)[attrKey])) {
            const items:[] = (<any>this.userCellar.attributes)[attrKey];
            this.AttributesFormGroup.addControl(attrKey, new FormArray([]));
            const formArray = this.AttributesFormGroup.get(attrKey) as FormArray;
            items.forEach(c =>{
              const group = this.fb.group(c)
              formArray.push(group)
            })            
        } else {
            data = createObject(
            attrKey,
            new FormControl((<any>this.userCellar.attributes)[attrKey], [])
          );
          container = this.fb.group(data) as FormGroup;
          (<FormArray>this.cellarForm.get('attributes')).push(container);
        }
      });
    });
    //console.log(this.cellarForm)
  }
  public get Attributes(): FormArray {
    return <FormArray>this.cellarForm.get('attributes');
  }
  public get SubAttributes(): FormArray {
    return <FormArray>this.AttributesFormGroup.get('partition');
  }
  public get AttributesFormGroup(): FormGroup {
    return <FormGroup>this.Attributes.controls[0];
  }
  public AttributesItems(slug: string):any[] {
    const array:FormArray = <FormArray>this.AttributesFormGroup.get(slug)
    return <any>array.controls
  }
  public AttributesChildFormGroup(slug: string, index?: any): FormGroup {
    const formArray: FormArray = <FormArray>this.AttributesFormGroup.get(slug);
    const formGroup: FormGroup = <FormGroup>formArray.at(index);
    return formGroup;
  }
  getOwner(): User {
    return this.owner;
  }
  SubscriberCount(): number {
    return this.userCellar && this.userCellar.Users
      ? this.userCellar.Users.length
      : 0;
  }
  isCollapsable(target:any){
    //form-check-input
    const isChecked = (<any>(
      (<HTMLInputElement>target).getElementsByClassName('form-check-input')[0]
    ))?.checked || false
    return isChecked
  }
  isEmpty(attribute:CellarAttribute){
    const items:any[] =Array.isArray(attribute.value) ? Array(attribute.value) : []
    //console.log(`${attribute.key} ${items.length}`)
    return items.length > 0 ? false : true
  }
  
  onSubmit() {
    const id:number = this.cellarForm.get('id')?.value
    //console.log(this.cellarForm.value[0])
    if(id){
      console.log(id)
      const data:{attributes:any} = {attributes:this.Attributes.value[0]}
      this.cellarService.put(id,data).subscribe(resp => {
        if(resp.ok){
          console.log("done")
        }
      })
    }
  }
  _setAddButtonStatus() {
    this._showAddStatus = !this._showAddStatus;
  }
  get isAddDisabled() {
    return !this._showAddStatus;
  }
  get cellarAttributes() {
    return new Set(
      [...this.CellarAttributes].filter(
        (x) => new Set(this.features.map((i) => i.key)).has(x.key) == false
      )
    );
  }
  showAdditionalAttributes(child: any, parent: any) {
    
    const formArraySlug = parent.firstChild.getElementsByTagName('button')[0]?.name;
    const target: HTMLElement = <HTMLElement>(<HTMLElement>parent).lastElementChild?.getElementsByTagName("div")[0]
    const isExpanded: boolean = target.classList.contains('expanded');
    const isChecked = (<any>(
      (<HTMLInputElement>parent).getElementsByClassName('form-check-input')[0]
    )).checked;

    if (isExpanded && isChecked) console.log('expanded found! [checked]');
    if (!isExpanded && isChecked) {
      target.classList.toggle('expanded');
      (<HTMLDivElement>child).classList.toggle('d-none');
      (<HTMLDivElement>parent).classList.toggle('sub-section');
    } else {
      target.className = '';
      (<HTMLDivElement>child).className = 'd-none';
      (<HTMLDivElement>parent).classList.remove('sub-section');
    }
  }
  onSelectedAttribute(attr: any) {
    this._setAddButtonStatus();
    this.features[this.features.length - 1].key = attr.key;
    this.features[this.features.length - 1].readonly = true;
    this.features[this.features.length - 1].type = this.CellarAttributes.find(
      (i) => slugify(i.key) == slugify(attr.key)
    )?.type;
    this.features[this.features.length - 1].slug = slugify(attr.key);
    const newAttr = this.features[this.features.length - 1];
    //check if control exists! otherwise add one.
    const control = this.AttributesFormGroup.get(newAttr.slug);
    if (!control)
      switch (newAttr.type) {
        case 'Toggle': {
          this.AttributesFormGroup.addControl(newAttr.slug, new FormArray([]));
          break;
        }
        default: {
          this.AttributesFormGroup.addControl(
            newAttr.slug,
            new FormControl('', [])
          );
          break;
        }
      }
    else {
      console.log('???');
    }
  }
  _onAddRowControl(slug: string, columns: string[]): FormGroup {
    console.log(slug);
    const formArray: FormArray = <FormArray>this.AttributesFormGroup.get(slug);
    const formGroup: FormGroup = new FormGroup({});
    columns.forEach((c) => {
      formGroup.addControl(c, new FormControl('', []));
    });
    formArray.push(formGroup);
    console.log(formGroup);
    return formGroup;
  }
  onAddDistribution() {
    const columns: string[] = ['country', 'threshold'];
    const formGroup = this._onAddRowControl('distribution', columns);
    this.distributions.push(formGroup.value);
  }
  onAddPartition(slug: any) {
    const columns: string[] = ['name', 'segment', 'count'];
    const formGroup = this._onAddRowControl('partition', columns);
    this.partitions.push(formGroup.value);
  }
  onAddNewAttribute() {
    this._setAddButtonStatus();
    this.features.push({ key: '', value: '', readonly: false, type: '' });
  }
  onRemoveNewAttribute(attr: any, element: any) {
    if ((<HTMLElement>element).classList.contains('expanded'))
      (<HTMLElement>element).classList.replace('expanded', 'collapsed');
    else if ((<HTMLElement>element).classList.contains('collapsed'))
      (<HTMLElement>element).classList.replace('collapsed', 'expanded');
    else {
      this.features = this.features.filter((x) => slugify(x.key) != slugify(attr.key));
      this._showAddStatus = true;
      (<FormGroup>(
        (<FormArray>this.cellarForm.get('attributes')).controls[0]
      )).removeControl(attr.slug);
    }

    const child = (<HTMLElement>element).parentElement?.parentElement
      ?.parentElement?.parentElement?.lastElementChild;
    const parent = (<HTMLElement>element).parentElement?.parentElement
      ?.parentElement?.parentElement?.firstElementChild;
    (<HTMLDivElement>child).classList.toggle('d-none');
    (<HTMLDivElement>parent).classList.toggle('sub-section');
    //this._setAddButtonStatus()
    //this._showAddStatus = true
  }
  _initAttributes() {
    this.features = Object.keys(this.userCellar.attributes).map(
      (key: string) => {
        const ca:any = this.CellarAttributes.find((i) => slugify(i.key) == slugify(key))
        return {
          key: ca?.key,
          value: (<any>this.userCellar.attributes)[key],
          readonly: true,
          type: this.CellarAttributes.find((i) => slugify(i.key) == slugify(key))?.type,
          slug: slugify(key),
        };
      }
    );
  }
}
