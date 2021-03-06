import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListadoPacientesPage } from './listado-pacientes.page';

describe('ListadoPacientesPage', () => {
  let component: ListadoPacientesPage;
  let fixture: ComponentFixture<ListadoPacientesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoPacientesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoPacientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
