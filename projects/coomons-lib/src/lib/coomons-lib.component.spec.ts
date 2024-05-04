import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoomonsLibComponent } from './coomons-lib.component';

describe('CoomonsLibComponent', () => {
  let component: CoomonsLibComponent;
  let fixture: ComponentFixture<CoomonsLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoomonsLibComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoomonsLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
