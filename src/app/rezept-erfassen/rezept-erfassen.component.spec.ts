import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RezeptErfassenComponent } from './rezept-erfassen.component';

describe('RezeptErfassenComponent', () => {
  let component: RezeptErfassenComponent;
  let fixture: ComponentFixture<RezeptErfassenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RezeptErfassenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RezeptErfassenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
