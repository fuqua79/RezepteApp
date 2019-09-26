import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RezeptHomeContainerComponent } from './rezept-home-container.component';

describe('RezeptHomeContainerComponent', () => {
  let component: RezeptHomeContainerComponent;
  let fixture: ComponentFixture<RezeptHomeContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RezeptHomeContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RezeptHomeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
