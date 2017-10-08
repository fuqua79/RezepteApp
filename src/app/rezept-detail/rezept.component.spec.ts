import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RezeptComponent } from './rezept.component';

describe('RezeptComponent', () => {
  let component: RezeptComponent;
  let fixture: ComponentFixture<RezeptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RezeptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RezeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
