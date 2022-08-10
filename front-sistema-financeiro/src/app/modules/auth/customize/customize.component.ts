import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-customize-page',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.scss']
})
export class CustomizeComponent implements OnInit {

  title = 'Configurações';
  icon = 'settings';

  constructor() { }

  ngOnInit(): void { }

}
