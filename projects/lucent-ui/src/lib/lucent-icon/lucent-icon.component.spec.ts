import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LucentIconComponent } from './lucent-icon.component';

describe('LucentIconComponent', () => {
  let component: LucentIconComponent;
  let fixture: ComponentFixture<LucentIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LucentIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LucentIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
