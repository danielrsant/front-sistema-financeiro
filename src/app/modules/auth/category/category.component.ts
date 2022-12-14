import { AUTO_STYLE } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { CurrencyPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';
import { Config } from 'src/app/shared/components/several-components/data-table/config';
import { FilterDialogComponent } from 'src/app/shared/components/several-components/filter-dialog/filter-dialog.component';
import { Operation } from 'src/app/shared/enums/operation';
import { UtilsService } from 'src/app/shared/services/utils.service';

import { PageConfig } from './page-config';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {

  id: number;
  openedForm = false;
  operation: Operation = Operation.INDEX;

  title = 'Categorias';
  icon = 'category';

  options: any = {};
  paginationInitial = { page: 1, limit: 10 };

  dataSource: any[] = [];
  columns = new PageConfig().columns;
  configuration = new Config({}, 0);

  formFilter: FormGroup;
  filterFields = new PageConfig().filterFields;
  selection = new SelectionModel<any>(true, []);

  destroy$ = new Subject();

  constructor(
    private _utilsService: UtilsService,
    private _categoryService: CategoryService,
    private _dialog: MatDialog,
    private _currencyPipe: CurrencyPipe,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.onRefresh(this.paginationInitial);
  }

  onRefresh(params?: any): void {
    this.options = { ...this.options, ...params };

    const { filter } = this.options;
    if (!filter) {
      delete this.options.filter;
    }

    this.dataSource = null;
    this._categoryService.loadAll(this.options).subscribe(
      (response: any) => {
        if (response) {
          response.data = response.data.map(data => {
            data.limite = data.limite ? this._currencyPipe.transform(data.limite, 'BRL') : 'R$00.00';
            return data;
          });

          this.dataSource = response.data;
          this.configuration.total = response.total;
        }
      },
      (error) => {
        this._toastr.error(error.error.message);
      }
    );
    this.filterOptions();
  }

  filterOptions(): void {
    Object.entries(this.options).forEach(([key, value]) => {
      if (!value) {
        delete this.options[key];
      }
    });
  }

  openDialogFilter(): void {
    this._dialog.open(FilterDialogComponent, {
      maxHeight: '80vh',
      maxWidth: '90%',
      height: AUTO_STYLE,
      width: window.innerWidth < 900 ? '90%' : '50%',
      data: {
        form: this.formFilter,
        fields: this.filterFields
      }
    }).afterClosed().pipe(takeUntil(this.destroy$)).subscribe((form) => {
      if (!form) { return; }

      this.formFilter = form;
      const obj = this._utilsService.removeNullUndefinedProperties(form.value);
      const filter = Object.keys(obj).map(item => {
        if (!obj[item]) {
          return null;
        } else {
          return `${item}||$eq||${obj[item]}`;
        }
      }).filter(item => item !== null && item !== undefined);

      this.options = { ...this.options, filter };
      this.onRefresh();
    });
  }

  onCreate(): void {
    this.operation = Operation.NEW;
    this.openedForm = true;
  }

  onView(row: any): void {
    this.id = row.id;
    this.operation = Operation.VIEW;
    this.openedForm = true;
  }

  onUpdate(row: any): void {
    this.id = row.id;
    this.operation = Operation.EDIT;
    this.openedForm = true;
  }

  onDelete(item: any): void { }

  onSearch(search: string): void {
    this._utilsService.paginatorWasChanged.emit();
    const params = { filter: null };

    if (search.length) {
      params.filter = `descricao||$contL||${search}`;
    }

    this.onRefresh({ ...params });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
