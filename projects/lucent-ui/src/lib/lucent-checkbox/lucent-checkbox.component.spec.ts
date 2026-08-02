import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LucentCheckboxComponent } from './lucent-checkbox.component';

describe('LucentCheckboxComponent', () => {
  let component: LucentCheckboxComponent;
  let fixture: ComponentFixture<LucentCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LucentCheckboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LucentCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
