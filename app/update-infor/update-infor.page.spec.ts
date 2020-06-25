import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateInforPage } from './update-infor.page';

describe('UpdateInforPage', () => {
  let component: UpdateInforPage;
  let fixture: ComponentFixture<UpdateInforPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateInforPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateInforPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
