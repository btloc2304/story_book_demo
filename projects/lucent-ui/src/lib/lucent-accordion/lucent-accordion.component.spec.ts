import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LucentAccordionComponent } from './lucent-accordion.component';

describe('LucentAccordionComponent', () => {
  let component: LucentAccordionComponent;
  let fixture: ComponentFixture<LucentAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LucentAccordionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LucentAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
