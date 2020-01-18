import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EstimacionIngestaPage } from './estimacion-ingesta.page';

describe('EstimacionIngestaPage', () => {
  let component: EstimacionIngestaPage;
  let fixture: ComponentFixture<EstimacionIngestaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimacionIngestaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EstimacionIngestaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
