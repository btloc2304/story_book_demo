import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LucentTabComponent } from './lucent-tab.component';

describe('LucentTabComponent', () => {
  let component: LucentTabComponent;
  let fixture: ComponentFixture<LucentTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LucentTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LucentTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
