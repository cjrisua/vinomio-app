import { Component, OnInit } from '@angular/core';
import { Config, ConfigService } from './config.services';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  providers: [ ConfigService ],
  styles: ['.error { color: #b30000; }']
})
export class ConfigComponent implements OnInit {

  error: any;
  headers: string[] = [];
  config: Config | undefined;

  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
  }

}
