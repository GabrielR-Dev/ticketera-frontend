import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSoporte } from './dashboard-soporte';

describe('DashboardSoporte', () => {
  let component: DashboardSoporte;
  let fixture: ComponentFixture<DashboardSoporte>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSoporte]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSoporte);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
