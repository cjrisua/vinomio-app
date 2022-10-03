import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cellar-dashboard-test',
  templateUrl: './cellar-dashboard-test.component.html',
  styleUrls: ['./cellar-dashboard-test.component.css']
})
export class CellarDashboardTestComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  @Input() id!: any
  ngOnInit(): void {
    console.debug(history.state)
  }

}
