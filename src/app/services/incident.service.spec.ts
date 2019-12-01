import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { IncidentService } from './incident.service';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { HttpClientModule } from '@angular/common/http';

describe('IncidentService', () => {
  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule,
      platformBrowserDynamicTesting());

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    })
      .compileComponents();

    const authService: AuthService = TestBed.get(AuthService);
    authService.login('admin', '12340');
  });

  it('should be created', () => {
    const service: IncidentService = TestBed.get(IncidentService);
    expect(service).toBeTruthy();
  });

  it('should get incidents', () => {
    const service: IncidentService = TestBed.get(IncidentService);
    service.getIncidents().subscribe(val => {
      expect(val.incidents).toBeDefined();
    });
  });

  it('should get incidents with new incident', () => {
    const service: IncidentService = TestBed.get(IncidentService);
    const incident = { name: 'testName', area: 'Welding', dueDate: new Date(), assignee: '',
      status: 'Open', priority: 'Major', startDate: new Date(), description: 'testDescription', id: 10 };
    service.addIncident(incident).subscribe(val => {
      expect(val.incidents).toContain(incident);
    });
  });
});
