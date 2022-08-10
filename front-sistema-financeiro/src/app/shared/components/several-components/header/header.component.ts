import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { sharedAnimations } from 'src/app/shared/animations';
import { Operation } from 'src/app/shared/enums/operation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: sharedAnimations,
})
export class HeaderComponent implements OnInit, OnChanges, OnDestroy {

  @Input() backPage = false;

  @Input() type: 'main' | 'form' = 'main';

  @Input() title = 'Título';
  @Input() icon: string;
  @Input() operation: Operation;

  @Input() btn: string;
  @Input() iconBtn: string;
  @Input() btnDisabled = false;

  @Input() height = '135px';
  @Input() bgImage = false;

  @Output() btnClick = new EventEmitter();
  @Output() btnClose = new EventEmitter();

  onDestroy$ = new Subject<any>();

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.operation?.currentValue && this.type === 'form') {
      switch (this.operation) {
        case Operation.NEW:
          this.title = 'Adicionando';
          break;
        case Operation.VIEW:
          this.title = 'Visualizando';
          break;
        case Operation.EDIT:
          this.title = 'Editando';
          break;
        default:
          break;
      }
    }
  }

  onClickBtn(): void {
    this.btnClick.emit();
  }

  onBackPage(): void {
    this.btnClose.emit();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
