import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LucentSliderComponent } from './lucent-slider.component';

describe('LucentSliderComponent', () => {
  let component: LucentSliderComponent;
  let fixture: ComponentFixture<LucentSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LucentSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LucentSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
