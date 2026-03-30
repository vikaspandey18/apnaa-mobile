import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubpromotersComponent } from './subpromoters.component';

describe('SubpromotersComponent', () => {
  let component: SubpromotersComponent;
  let fixture: ComponentFixture<SubpromotersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubpromotersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubpromotersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
