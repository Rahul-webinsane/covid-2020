import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarsComponent } from './NavbarsComponent';


describe('NavbarsComponent', () => {
  let component: NavbarsComponent;
  let fixture: ComponentFixture<NavbarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
