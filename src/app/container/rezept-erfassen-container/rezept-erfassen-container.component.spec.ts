import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RezeptErfassenContainerComponent } from './rezept-erfassen-container.component';

describe('RezeptErfassenContainerComponent', () => {
  let component: RezeptErfassenContainerComponent;
  let fixture: ComponentFixture<RezeptErfassenContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RezeptErfassenContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RezeptErfassenContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
