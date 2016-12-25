/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BnProfilComponent } from './bn-profil.component';

describe('BnProfilComponent', () => {
  let component: BnProfilComponent;
  let fixture: ComponentFixture<BnProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BnProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BnProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
