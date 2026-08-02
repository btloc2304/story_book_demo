import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LucentProgressBarComponent } from './lucent-progress-bar.component';

describe('LucentProgressBarComponent', () => {
  let component: LucentProgressBarComponent;
  let fixture: ComponentFixture<LucentProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LucentProgressBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LucentProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
