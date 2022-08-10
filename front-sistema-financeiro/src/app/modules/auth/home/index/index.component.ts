import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/shared/components/several-components/data-table/config';
import { TableColumn } from 'src/app/shared/models/table-column.interface';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class HomeComponent implements OnInit {

  selection = new SelectionModel<any>(true, []);
  dataSource: any[] = [];
  columns: TableColumn<any>[] = [];
  configuration = new Config({}, 2);

  selection2 = new SelectionModel<any>(true, []);
  dataSource2: any[] = [];
  columns2: TableColumn<any>[] = [];
  configuration2 = new Config({}, 2);

  constructor() {
    this.columns = [
      { label: 'Desenvolvedor', property: 'dev', type: 'text', visible: true, align: 'start', sort: false },
      { label: 'Github', property: 'github', type: 'text', visible: true, align: 'start', sort: false },
      { label: 'E-mail de contato', property: 'email', type: 'text', visible: true, align: 'start', sort: false },
    ];
    this.dataSource = [
      { dev: 'Daniel Rosa Santiago', github: 'https://github.com/danielrsant', email: 'danrsant14@gmail.com' },
      { dev: 'George Alexandre Feitosa Fonseca Júnior', github: 'https://github.com/georgejr3211', email: 'georgefeitosajr12@gmail.com' }
    ];
    this.columns2 = [
      { label: 'Stack', property: 'stack', type: 'text', visible: true, align: 'start', sort: false },
      { label: 'FrameWork', property: 'framework', type: 'text', visible: true, align: 'start', sort: false },
      { label: 'Versão', property: 'version', type: 'text', visible: true, align: 'start', sort: false },
    ];
    this.dataSource2 = [
      { stack: 'Front-end', framework: 'Angular', version: '10.0.2' },
      { stack: 'Back-end', framework: 'NestJS', version: '6.7.2' }
    ];
  }

  ngOnInit(): void { }

}
