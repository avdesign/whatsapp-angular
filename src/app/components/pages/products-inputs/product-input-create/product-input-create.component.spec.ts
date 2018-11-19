import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInputCreateComponent } from './product-input-create.component';

describe('ProductInputCreateComponent', () => {
  let component: ProductInputCreateComponent;
  let fixture: ComponentFixture<ProductInputCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductInputCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInputCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
