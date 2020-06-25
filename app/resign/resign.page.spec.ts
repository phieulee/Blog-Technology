import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResignPage } from './resign.page';

describe('ResignPage', () => {
  let component: ResignPage;
  let fixture: ComponentFixture<ResignPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResignPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
