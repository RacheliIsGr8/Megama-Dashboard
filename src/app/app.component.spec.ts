import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DashboardHashvaatMoamadimModule } from './features/dashboard-hashvaat-moamadim/dashboard-hashvaat-moamadim.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardHashvaatMoamadimModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
