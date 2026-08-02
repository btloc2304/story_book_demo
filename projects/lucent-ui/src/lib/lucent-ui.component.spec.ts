import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LucentUiComponent } from './lucent-ui.component';

describe('LucentUiComponent', () => {
  let component: LucentUiComponent;
  let fixture: ComponentFixture<LucentUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LucentUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LucentUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
