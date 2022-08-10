import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialMovementComponent } from './index.component';

describe('FinancialMovementComponent', () => {
  let component: FinancialMovementComponent;
  let fixture: ComponentFixture<FinancialMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
