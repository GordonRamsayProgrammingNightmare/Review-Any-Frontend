/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AuthidComponent } from './authid.component';

describe('AuthidComponent', () => {
  let component: AuthidComponent;
  let fixture: ComponentFixture<AuthidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
