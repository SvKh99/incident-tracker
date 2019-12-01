import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { HttpClientModule } from '@angular/common/http';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule,
      platformBrowserDynamicTesting());

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ]
    })
      .compileComponents();
  });

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it('login should return username and token', () => {
    const service: AuthService = TestBed.get(AuthService);
    service.login('admin', '12340').subscribe(val => {
      expect(val.username).toBeDefined();
      expect(val.token).toBeDefined();
    });
  });

  it('check token expiration', () => {
    localStorage.clear();
    localStorage.setItem('activation_time', String(new Date(2019, 1, 1)));

    const service: AuthService = TestBed.get(AuthService);
    expect(service.checkTokenExpiration()).toBeTruthy();
  });

  it('should get new token', () => {
    localStorage.clear();
    localStorage.setItem('username', 'admin');

    const service: AuthService = TestBed.get(AuthService);
    service.getNewToken();

    expect(localStorage.getItem('access_token')).toBeDefined();
  });
});
