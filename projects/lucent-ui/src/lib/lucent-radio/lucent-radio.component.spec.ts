import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LucentRadioComponent } from './lucent-radio.component';

describe('LucentRadioComponent', () => {
  let component: LucentRadioComponent;
  let fixture: ComponentFixture<LucentRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LucentRadioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LucentRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
