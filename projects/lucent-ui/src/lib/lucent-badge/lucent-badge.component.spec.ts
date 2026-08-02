import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LucentBadgeComponent } from './lucent-badge.component';

describe('LucentBadgeComponent', () => {
  let component: LucentBadgeComponent;
  let fixture: ComponentFixture<LucentBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LucentBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LucentBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
