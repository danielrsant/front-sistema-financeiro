import { MediaMatcher } from '@angular/cdk/layout';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { StyleService } from 'src/app/shared/services/style.service';

import { trackByRoute } from '../../../shared/utils/track-by';


export const ROUTES: any[] = [
  {
    label: 'DASHBOARDS', type: 'subheading', children: [
      { route: '/auth/pages/dashboard', label: 'Dashboard', icon: 'insert_chart_outlined', type: 'link' }
    ]
  },
  {
    label: 'GESTÃO', type: 'subheading', children: [
      { route: '/auth/pages/contas', label: 'Contas', icon: 'account_balance_wallet', type: 'link' },
      { route: '/auth/pages/categorias', label: 'Categorias Financeiras', icon: 'category', type: 'link' },
      { route: '/auth/pages/movimentacoes', label: 'Movimentações', icon: 'import_export', type: 'link' },
    ]
  },
  {
    label: 'CONFIGURAÇÕES', type: 'subheading', children: [
      { route: '/auth/pages/perfil', label: 'Perfil', icon: 'account_circle', type: 'link' },
    ]
  }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  @ViewChild('shortcutsOrigin') private _shortcutsOrigin: MatButton;
  @ViewChild('shortcutsPanel') private _shortcutsPanel: TemplateRef<any>;

  private _overlayRef: OverlayRef;

  // items = this.navigationService.items;
  items = ROUTES;
  selectedItem;

  documentElement;
  fullScreenOpened = false;

  user: any;
  userProfile$: Observable<string>;

  trackByRoute = trackByRoute;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef,
    private _changeDetectorRef: ChangeDetectorRef,
    private navigationService: NavigationService,
    private _media: MediaMatcher,
    private _styleService: StyleService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private document: any
  ) {
    this.mobileQuery = _media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => _changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.userProfile$ = this._styleService.image$;
    this.user = JSON.parse(localStorage.getItem('user'));
    this.documentElement = document.documentElement;
  }

  onProfile(): void {
    this._router.navigate([`../auth/pages/perfil`], { relativeTo: this._activatedRoute });
  }

  onInfo(): void {
    this._router.navigate([`../auth/pages/home`], { relativeTo: this._activatedRoute });
  }

  openCustomize(): void {
    this.openPanel();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._router.navigate(['/login']);
  }

  openFullScreen(): void {
    if (this.documentElement.requestFullscreen) {
      this.documentElement.requestFullscreen();
    } else if (this.documentElement.mozRequestFullScreen) {
      /* Firefox */
      this.documentElement.mozRequestFullScreen();
    } else if (this.documentElement.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.documentElement.webkitRequestFullscreen();
    } else if (this.documentElement.msRequestFullscreen) {
      /* IE/Edge */
      this.documentElement.msRequestFullscreen();
    }
    this.fullScreenOpened = true;
  }

  closeFullscreen(): void {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }

    this.fullScreenOpened = false;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  openPanel(): void {
    // Create the overlay
    this._overlayRef = this._overlay.create({
      backdropClass: '',
      hasBackdrop: true,
      scrollStrategy: this._overlay.scrollStrategies.block(),
      positionStrategy: this._overlay.position()
        .flexibleConnectedTo(this._shortcutsOrigin._elementRef.nativeElement)
        .withFlexibleDimensions()
        .withViewportMargin(16)
        .withLockedPosition()
        .withPositions([
          { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
          { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
          { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
          { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' }
        ])
    });

    // Create a portal from the template
    const templatePortal = new TemplatePortal(this._shortcutsPanel, this._viewContainerRef);
    // Attach the portal to the overlay
    this._overlayRef.attach(templatePortal);
    // Subscribe to the backdrop click
    this._overlayRef.backdropClick().subscribe(() => {
        // If overlay exists and attached...
        if (this._overlayRef && this._overlayRef.hasAttached()) {
            // Detach it
            this._overlayRef.detach();
        }
        // If template portal exists and attached...
        if (templatePortal && templatePortal.isAttached) {
            // Detach it
            templatePortal.detach();
        }
        // Make sure to start in 'view' mode
        // this.mode = 'view';
    });
}

}
