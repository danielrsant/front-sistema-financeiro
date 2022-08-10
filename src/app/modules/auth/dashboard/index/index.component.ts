import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DashboardService } from '../../../../services/dashboard.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  formFilter: FormGroup;

  cards = [
    {
      title: 'Receitas',
      subTitle: 'R$ 0,00',
      icon: 'call_made',
      color: 'card-color-green',
    },
    {
      title: 'Despesas',
      subTitle: 'R$ 0,00',
      icon: 'call_received',
      color: 'card-color-red',
    },
    {
      title: 'Contas a Pagar',
      subTitle: 'R$ 0,00',
      icon: 'receipt',
      color: 'card-neon-life',
    },
    {
      title: 'Contas a Receber',
      subTitle: 'R$ 0,00',
      icon: 'receipt',
      color: 'card-color-yellow',
    },
    {
      title: 'Contas Atrasadas',
      subTitle: 'R$ 0,00',
      icon: 'assignment_late',
      color: 'card-color-purple',
    },
    {
      title: 'Saldo Disponível',
      subTitle: 'R$ 0,00',
      icon: 'account_balance_wallet',
      color: 'card-color-blue',
    },
    {
      title: 'Saldo Previsto',
      subTitle: 'R$ 0,00',
      icon: 'request_page',
      color: 'card-color-pinot-noir',
    },
  ];

  destroy$ = new Subject();

  constructor(
    private _dashboardService: DashboardService,
  ) {
    this.createFormFilter();
  }

  ngOnInit(): void { }

  createFormFilter(): void {
    this.formFilter = new FormGroup({
      dtPeriodo1: new FormControl(new Date()),
      dtPeriodo2: new FormControl(new Date())
    });
    const today = new Date();
    this.formFilter.get('dtPeriodo2').setValue(new Date(today.getFullYear(), today.getMonth() + 1, 0));
    this.listenDtPeriodo2();
  }

  listenDtPeriodo2(): void {
    this.formFilter.get('dtPeriodo2').valueChanges.pipe(takeUntil(this.destroy$)).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
