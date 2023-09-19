import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemTaskComponent } from './list-item-task.component';

describe('ListItemTaskComponent', () => {
  let component: ListItemTaskComponent;
  let fixture: ComponentFixture<ListItemTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
