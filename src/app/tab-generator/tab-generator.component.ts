import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { STATIC_PAGES } from './static-pages';

@Component({
  selector: 'app-tab-generator',
  templateUrl: './tab-generator.component.html',
  styleUrls: ['./tab-generator.component.scss']
})
export class TabGeneratorComponent implements OnInit, OnDestroy {

  tabs: Array<any> = [];
  tabIndex = new FormControl(1);

  endpoint: Array<number | string> = [];
  
  staticTabs = STATIC_PAGES;

  destroy$ = new Subject();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.createDefaultPage();
    this.createPagesInSession();
    this.listenRouteChanges();
  }

  createDefaultPage(): void {
    this.addNewTab(null, true);
  }

  createPagesInSession(): void {
    const screens = JSON.parse(sessionStorage.getItem('screens'));
    if (screens && screens.length) {
      this.getScreenInfo(screens);
    }
  }

  listenRouteChanges(): void {
    this._router.events.pipe(takeUntil(this.destroy$)).subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getScreenInfo();
      }
    });
  }

  getScreenInfo(endpoints?: Array<number>): void {
    this.endpoint = endpoints ? endpoints : [this._activatedRoute.snapshot.params.endpoint];

    const indexFound = this.tabs.findIndex(element => this.endpoint[0] === element.endpoint);

    if (indexFound > -1) {
      this.tabIndex = new FormControl(indexFound);
      return;
    }

    if (this.endpoint.length === 1 && this.endpoint[0] === 'index' || this.endpoint[0] === 'dashboard') {
      return;
    }

    this.endpoint.forEach(endpoint => {
      this.addNewTab(endpoint);
    });
  }

  addNewTab(endpoint: string | number | null, isProfile?: boolean): void {
    const item: any = STATIC_PAGES.find(element => element.endpoint === endpoint);
    const newTab = {
      dynamic: false,
      endpoint: isProfile ? 'dashboard' : endpoint,
      title: isProfile ? 'Dashboard' : item ? item.title : 'Sem Título',
      icon: item ? item.icon : 'home',
    };
    this.tabs = [...this.tabs, newTab];
    this.changeToNewTab(endpoint);
  }

  changeToNewTab(endpoint): void {
    this.saveScreens(endpoint);
    this.tabIndex.setValue(this.tabs.length - 1);
    this.setCurrentScreen();
    this._changeDetectorRef.detectChanges();
  }

  saveScreens(endpoint: string | number | null): void {
    if (endpoint && endpoint !== 'index' && endpoint !== 'dashboard') {
      let screens = [
        ...sessionStorage.getItem('screens') ? JSON.parse(sessionStorage.getItem('screens')) : [],
        ...this.tabs.length ? this.tabs.map(element => element.endpoint) : []
      ];
      screens = [...new Set(screens)];
      if (screens.length) {
        sessionStorage.setItem('screens', JSON.stringify(
          screens.filter(element => element !== 'index' && element !== 'dashboard')
        ));
      }
    }
  }

  removeTab(index: number): void {
    this.tabs.splice(index, 1);
    if (this.tabIndex.value > 0) {
      this.tabIndex.setValue(this.tabIndex.value - 1);
      this.setCurrentScreen();
    }
    if (this.tabs[this.tabIndex.value].endpoint === this.tabs[index]?.endpoint) {
      const urlEndpoint = this.tabIndex.value > -1 ? this.tabs[this.tabIndex.value].endpoint : 'dashboard';
      this._router.navigate([`../${urlEndpoint}`], {
        relativeTo: this._activatedRoute,
      });
    }
    this.saveScreensSession();
  }

  saveScreensSession(): void {
    const endpointsTab = this.tabs.length ? this.tabs.map((element: any) => element.endpoint) : [];
    sessionStorage.setItem('screens', JSON.stringify(
      endpointsTab.filter((endpoint: string) => endpoint !== 'index' && endpoint !== 'dashboard')
    ));
  }

  changeTab(value: any): void {
    this.tabIndex.setValue(value);
    this.setCurrentScreen();
    const urlEndpoint = this.tabIndex.value > -1 ? this.tabs[this.tabIndex.value].endpoint : 'dashboard';
    this._router.navigate([`../${urlEndpoint}`], {
      relativeTo: this._activatedRoute,
    });
  }

  setCurrentScreen(): void {
    sessionStorage.setItem('screenId', this.tabs[this.tabIndex.value].endpoint);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
