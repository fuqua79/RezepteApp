import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RezeptHomeComponent } from './rezept-home.component';

describe('RezeptHomeComponent', () => {
  let component: RezeptHomeComponent;
  let fixture: ComponentFixture<RezeptHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RezeptHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RezeptHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
