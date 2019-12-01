import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentDetailsComponent } from './incident-details.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '../../store/reducers/app.reducers';
import { AppRoutingModule } from '../../app-routing.module';
import { RouterModule } from '@angular/router';
import { AppModule } from '../../app.module';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { APP_BASE_HREF } from '@angular/common';

describe('IncidentDetailsComponent', () => {
  let component: IncidentDetailsComponent;
  let fixture: ComponentFixture<IncidentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule,
      platformBrowserDynamicTesting());

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        AppModule,
        AppRoutingModule,
        RouterModule.forRoot([]),
        StoreModule.forRoot(appReducers)
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/incident/:id'}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
