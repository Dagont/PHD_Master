import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalListadoPacientesPage } from './modal-listado-pacientes.page';

describe('ModalListadoPacientesPage', () => {
  let component: ModalListadoPacientesPage;
  let fixture: ComponentFixture<ModalListadoPacientesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalListadoPacientesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalListadoPacientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
