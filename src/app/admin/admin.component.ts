import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MODEL } from '../app.module';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  modelCollection: any[] = []
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
     Object.keys(MODEL).map((name) => {
        this.modelCollection.push({
          name:name, 
          value:(<any>MODEL)[name],
          description:'With supporting text below as a natural lead-in to additional content.'
        })
      })
      //console.log(this.modelCollection)
  }
  onNavigateToModel(model?:any)
  { 
    this.router.navigate([model], {relativeTo:this.route})
  }
  setModelNameEvent(model:string):void{
    
  }

}
