import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabGeneratorComponent } from './tab-generator.component';

describe('TabGeneratorComponent', () => {
  let component: TabGeneratorComponent;
  let fixture: ComponentFixture<TabGeneratorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TabGeneratorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
