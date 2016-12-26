/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Avatar } from './avatar.component';

describe('Avatar', () => {
  let component: Avatar;
  let fixture: ComponentFixture<Avatar>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Avatar ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Avatar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
