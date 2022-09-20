import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ObjectiveService } from 'src/app/services/objective.service';
import { LoadingService } from 'src/app/shared/components/several-components/loading/loading.service';
import { Operation } from 'src/app/shared/enums/operation';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-objective',
  templateUrl: './objective.component.html',
  styleUrls: ['./objective.component.scss']
})
export class ObjectiveComponent implements OnInit {

  id: number;
  openedForm = false;
  operation: Operation = Operation.INDEX;

  title = 'Objetivos';
  icon = 'done';

  options: any = {};
  destroy$ = new Subject<any>();
  dataSource: any[] = [];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _utilsService: UtilsService,
    private _loadingService: LoadingService,
    private _dialog: MatDialog,
    private _toastr: ToastrService,
    private _currencyPipe: CurrencyPipe,
    private _objectiveService: ObjectiveService
  ) { }

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh(params?: { page?: number; limit?: number; s?: any }): void {
    this.options = { ...this.options, ...params };

    const { s } = this.options;
    if (!s) {
      delete this.options.s;
    }

    const { sort } = this.options;
    if (sort && this.options.sort.indexOf('tipoMovimentacao') > -1) {
      this.options.sort = this.options.sort.replace('tipoMovimentacao', 'tipoMovimentacao.id');
    } else if (sort && this.options.sort.indexOf('categoria') > -1) {
      this.options.sort = this.options.sort.replace('categoria', 'categoria.id');
    }

    this._loadingService.show();
    this._objectiveService.loadAll(this.options).pipe(takeUntil(this.destroy$), map((response: any) => {
      response.data = response.data.map(data => {
        data.total = Number(data.total);
        data.total_depositado = Number(data.total_depositado);

        return data;
      });
      return response;
    })).subscribe(
      (response: any) => {
        if (response) {
          this.dataSource = response.data;
        }
        this._loadingService.hide();
      },
      (error) => {
        this._loadingService.hide();
        this._toastr.error(error.error.message);
      }
    );
  }

  onCreate(): void {
    this.operation = Operation.NEW;
    this.openedForm = true;
  }

  onUpdate(row: any): void {
    this.id = row.id;
    this.operation = Operation.EDIT;
    this.openedForm = true;
  }
  
}
