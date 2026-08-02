import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LucentInputComponent } from './lucent-input.component';

describe('LucentInputComponent', () => {
  let component: LucentInputComponent;
  let fixture: ComponentFixture<LucentInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LucentInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LucentInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
