import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ValoracionPage } from './valoracion.page';

describe('ValoracionPage', () => {
  let component: ValoracionPage;
  let fixture: ComponentFixture<ValoracionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValoracionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ValoracionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
