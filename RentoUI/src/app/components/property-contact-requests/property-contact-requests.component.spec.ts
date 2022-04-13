import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyContactRequestsComponent } from './property-contact-requests.component';

describe('PropertyContactRequestsComponent', () => {
  let component: PropertyContactRequestsComponent;
  let fixture: ComponentFixture<PropertyContactRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyContactRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyContactRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
