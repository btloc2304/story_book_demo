import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LucentButtonComponent } from './lucent-button.component';

describe('LucentButtonComponent', () => {
  let component: LucentButtonComponent;
  let fixture: ComponentFixture<LucentButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LucentButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LucentButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
