import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RezeptListContainerComponent } from './rezept-list-container.component';

describe('RezeptListContainerComponent', () => {
  let component: RezeptListContainerComponent;
  let fixture: ComponentFixture<RezeptListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RezeptListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RezeptListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
