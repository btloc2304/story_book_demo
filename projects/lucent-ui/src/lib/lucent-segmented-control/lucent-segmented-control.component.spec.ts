import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LucentSegmentedControlComponent } from './lucent-segmented-control.component';

describe('LucentSegmentedControlComponent', () => {
  let component: LucentSegmentedControlComponent;
  let fixture: ComponentFixture<LucentSegmentedControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LucentSegmentedControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LucentSegmentedControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
