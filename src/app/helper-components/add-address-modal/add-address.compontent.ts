import { ComponentFixture, TestBed } from '@angular/core/testing';
import { addAddressModal } from './add-address.compontent.spec';

describe('addAddressModal', () => {
  let component: addAddressModal;
  let fixture: ComponentFixture<addAddressModal>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [addAddressModal],
    });
    fixture = TestBed.createComponent(addAddressModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
export { addAddressModal };

