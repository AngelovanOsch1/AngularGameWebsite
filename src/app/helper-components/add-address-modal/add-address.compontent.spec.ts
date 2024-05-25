import { ComponentFixture, TestBed } from '@angular/core/testing';
import { addAddressModal } from './add-address.compontent';
import { AppModule } from 'src/app/app.module';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('ComponentNameComponent', () => {
  let component: addAddressModal;
  let fixture: ComponentFixture<addAddressModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ addAddressModal ],
      imports: [ MatDialogModule, AppModule ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(addAddressModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
