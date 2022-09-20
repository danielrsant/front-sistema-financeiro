import { AUTO_STYLE } from '@angular/animations';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FinancialMovementService } from '../../../../services/financial-movement.service';
import { LoadingService } from '../../../../shared/components/several-components/loading/loading.service';
import { FormDialogComponent } from '../components/form-dialog/form-dialog.component';
import { ObjectiveService } from './../../../../services/objective.service';
import { Operation } from './../../../../shared/enums/operation';

// tslint:disable: variable-name

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnChanges, OnDestroy {

  @Input() id: any;
  @Input() operation: Operation;

  @Output() refresh = new EventEmitter();
  @Output() close = new EventEmitter();

  title: string;
  icon = 'done';

  form: FormGroup;

  formMovimentacao: FormGroup;

  dtHoje = new Date();

  destroy$ = new Subject();

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _objectiveService: ObjectiveService,
    private _financialMovementService: FinancialMovementService,
    private _loadingService: LoadingService,
    private _toastr: ToastrService,
    private _dialog: MatDialog,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.onRefresh();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.id?.currentValue) {
      this.setForm();
    }
  }

  onRefresh(): void { }

  createForm(): void {
    const pessoa = JSON.parse(localStorage.getItem('user'));
    this.form = new FormGroup({
      id: new FormControl(null),
      descricao: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      total: new FormControl(0, [Validators.required, Validators.min(0.01)]),
      dtConclusao: new FormControl(null, Validators.required),
      pessoa: new FormControl({ id: pessoa.id }),
    });

  }

  setForm(): void {
    if (
      this.operation === Operation.EDIT ||
      this.operation === Operation.VIEW
    ) {
      this._loadingService.show();
      this._objectiveService.loadOne(this.id).pipe(takeUntil(this.destroy$)).subscribe(
        (response: any) => {

          this._loadingService.hide();

          if (!response) {
            return;
          }

          this.form.patchValue(response);

          if (this.operation === Operation.VIEW) {
            this.form.disable();
          }
        },
        (err) => {
          this._toastr.error(err);
          this._loadingService.hide();
        }
      );
    }
  }

  onSave(): void {
    this._loadingService.show();

    if (this.form.dirty) {
      if (this.operation === Operation.NEW) {
        this.onCreate();
      } else {
        this.onUpdate();
      }
    }
  }

  onCreate(): void {
    this._objectiveService.create(this.form.value).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        this.refresh.emit();
        this.close.emit();
        this._loadingService.hide();
      },
      (error) => {
        this._loadingService.hide();
        this._toastr.error(error);
      }
    );
  }

  onUpdate(): void {
    this.form.enable();
    this._objectiveService
      .update(this.form.value.id, this.form.value)
      .pipe(takeUntil(this.destroy$)).subscribe(
        (response: any) => {
          this.refresh.emit();
          this.close.emit();
          this._loadingService.hide();
        },
        (error) => {
          this._toastr.error(error);
          this._loadingService.hide();
        }
      );

    this._financialMovementService.create([this.formMovimentacao.value]).subscribe(response => {
      this._toastr.success('Registro salvo com sucesso!');
      this._loadingService.hide();
      console.log(response);
    },
      err => {
        this._toastr.error(err);
        this._loadingService.hide();
      });
  }

  openDialog(): void {
    this._dialog.open(FormDialogComponent, {
      maxHeight: '80vh',
      maxWidth: '100vh',
      height: AUTO_STYLE,
      width: window.innerWidth < 900 ? '95%' : '50%',
      data: {
        objetivoId: this.form.get('id').value,
        descricao: this.form.get('descricao').value
      },
    })
      .afterClosed()
      .subscribe(response => {
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
