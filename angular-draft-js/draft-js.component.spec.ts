import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftJsComponent } from './draft-js.component';

describe('DraftJsComponent', () => {
  let component: DraftJsComponent;
  let fixture: ComponentFixture<DraftJsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftJsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
