import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalEstimacionIngestaPage } from './modal-estimacion-ingesta.page';

describe('ModalEstimacionIngestaPage', () => {
  let component: ModalEstimacionIngestaPage;
  let fixture: ComponentFixture<ModalEstimacionIngestaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEstimacionIngestaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalEstimacionIngestaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
