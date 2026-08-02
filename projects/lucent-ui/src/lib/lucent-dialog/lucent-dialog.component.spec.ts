import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LucentDialogComponent } from './lucent-dialog.component';

describe('LucentDialogComponent', () => {
  let component: LucentDialogComponent;
  let fixture: ComponentFixture<LucentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LucentDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LucentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
