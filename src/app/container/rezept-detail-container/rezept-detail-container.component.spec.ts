import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RezeptDetailContainerComponent } from './rezept-detail-container.component';

describe('RezeptDetailContainerComponent', () => {
  let component: RezeptDetailContainerComponent;
  let fixture: ComponentFixture<RezeptDetailContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RezeptDetailContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RezeptDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
