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
        const data = createObject(
          attrKey,
          new FormControl((<any>this.userCellar.attributes)[attrKey], [])
        );
        const group = this.fb.group(data) as FormGroup;
        (<FormArray>this.cellarForm.get('attributes')).push(group);
      });
    });
  }
  public get Attributes(): FormArray {
    return <FormArray>this.cellarForm.get('attributes');
  }
  public get SubAttributes(): FormArray {
    //console.log(<FormArray>this.AttributesFormGroup.get('partition'))
    return <FormArray>this.AttributesFormGroup.get('partition')
  }
  public get AttributesFormGroup(): FormGroup {
    return <FormGroup>this.Attributes.controls[0];
  }
  public AttributesChildFormGroup(slug:string, index?:any): FormGroup {
    const formArray:FormArray = (<FormArray>this.AttributesFormGroup.get(slug))
    const formGroup:FormGroup = (<FormGroup>formArray.at(index))
    return formGroup
  }
  getOwner(): User {
    return this.owner;
  }
  SubscriberCount(): number {
    return this.userCellar && this.userCellar.Users
      ? this.userCellar.Users.length
      : 0;
  }
  onSubmit() {
    console.log(this.cellarForm.get('attributes')?.value)
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
    const formArraySlug = parent.firstChild.getElementsByTagName('button')[0]?.name
    //if(formArraySlug)
    //  this.onAddPartition(formArraySlug)

    const target: HTMLElement = <HTMLElement>(
      (<HTMLElement>parent).lastElementChild?.firstChild?.firstChild
    );
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
      (i) => i.key == attr.key
    )?.type;
    this.features[this.features.length - 1].slug = slugify(attr.key);
    const newAttr = this.features[this.features.length - 1];
     //check if control exists! otherwise add one.
     const control = this.AttributesFormGroup.get(newAttr.key);
     if (!control)
       switch (newAttr.type) {
         case 'Toggle': {
           this.AttributesFormGroup.addControl(newAttr.slug,new FormArray([]));
           break;
         }
         default: {
           this.AttributesFormGroup.addControl(newAttr.key,new FormControl('', []));
           break;
         }
       }
     else {
       console.log('???');
     }
  }
  _onAddRowControl(slug:string, columns:string[]) : FormGroup{
    console.log(slug)
    const formArray:FormArray = <FormArray>this.AttributesFormGroup.get(slug)
    const formGroup:FormGroup = new FormGroup({})
    columns.forEach(c => {
      formGroup.addControl(c,new FormControl('',[]))
    })
    formArray.push(formGroup)
    console.log(formGroup)
    return formGroup
  }
  onAddDistribution() {
    //this.distributions.push({ country: '', count: '' });
    const columns:string[]=['country','threshold']
    const formGroup = this._onAddRowControl('distribution',columns)
    this.distributions.push(formGroup.value)
  }
  onAddPartition(slug:any) {
    const columns:string[]=['name', 'segment', 'count']
    const formGroup = this._onAddRowControl('partition',columns)
    /*
    const formArray:FormArray = <FormArray>this.AttributesFormGroup.get(slug)
    const formGroup:FormGroup = new FormGroup({})
    columns.forEach(c => {
      formGroup.addControl(c,new FormControl('',[]))
    })
    formArray.push(formGroup)*/
    //console.log(this.partitions)
    this.partitions.push(formGroup.value)
    //console.log(this.cellarForm)
  }
  onAddNewAttribute() {
    this._setAddButtonStatus();
    this.features.push({ key: '', value: '', readonly: false, type: '' });
  }
  onRemoveNewAttribute(attr: any, element: any) {
    //console.log(element)
    console.log(attr)
    if ((<HTMLElement>element).classList.contains('expanded'))
      (<HTMLElement>element).classList.replace('expanded', 'collapsed');
    else if ((<HTMLElement>element).classList.contains('collapsed'))
      (<HTMLElement>element).classList.replace('collapsed', 'expanded');
    else {
      this.features = this.features.filter((x) => x.key != attr.key);
      this._showAddStatus = true;
      (<FormGroup>(<FormArray>this.cellarForm.get('attributes')).controls[0]).removeControl(attr.slug)
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
        return {
          key: key,
          value: (<any>this.userCellar.attributes)[key],
          readonly: true,
          type: this.CellarAttributes.find((i) => i.key == key)?.type,
          slug: slugify(key),
        };
      }
    );
  }
}
