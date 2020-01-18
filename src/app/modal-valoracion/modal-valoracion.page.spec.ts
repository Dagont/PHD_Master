import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalValoracionPage } from './modal-valoracion.page';

describe('ModalValoracionPage', () => {
  let component: ModalValoracionPage;
  let fixture: ComponentFixture<ModalValoracionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalValoracionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalValoracionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
