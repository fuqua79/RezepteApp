import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RezeptListeComponent } from './rezept-liste.component';

describe('RezeptListeComponent', () => {
  let component: RezeptListeComponent;
  let fixture: ComponentFixture<RezeptListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RezeptListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RezeptListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
