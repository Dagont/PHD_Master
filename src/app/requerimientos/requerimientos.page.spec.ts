import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RequerimientosPage } from './requerimientos.page';

describe('RequerimientosPage', () => {
  let component: RequerimientosPage;
  let fixture: ComponentFixture<RequerimientosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequerimientosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RequerimientosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
