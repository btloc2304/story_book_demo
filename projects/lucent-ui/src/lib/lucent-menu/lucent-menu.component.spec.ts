import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LucentMenuComponent } from './lucent-menu.component';

describe('LucentMenuComponent', () => {
  let component: LucentMenuComponent;
  let fixture: ComponentFixture<LucentMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LucentMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LucentMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
