import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { HttpClientModule } from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import { UserEffects } from '../store/effects/user.effects';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '../store/reducers/app.reducers';
import { AuthService } from './auth.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule,
      platformBrowserDynamicTesting());

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot(appReducers),
        EffectsModule.forRoot([UserEffects]),
      ],
      providers: [
        AuthService
      ]
    })
      .compileComponents();

    const authService: AuthService = TestBed.get(AuthService);
    authService.login('admin', '12340');
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('should get users', () => {
    const service: UserService = TestBed.get(UserService);
    service.getUsers().subscribe(val => {
      expect(val.users).toBeDefined();
    });
  });

  it('should get users with new user', () => {
    const service: UserService = TestBed.get(UserService);
    const user = { username: 'testName', password: 'testPassword', birthday: 'testDate',
      position: 'testPosition', areas: ['Welding']};
    service.addUser(user).subscribe(val => {
      expect(val.users).toContain({ username: 'testName', birthday: 'testDate',
        position: 'testPosition', areas: ['Welding']});
    });
  });
});
