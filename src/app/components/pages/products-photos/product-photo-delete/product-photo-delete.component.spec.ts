import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPhotoDeleteComponent } from './product-photo-delete.component';

describe('ProductPhotoDeleteComponent', () => {
  let component: ProductPhotoDeleteComponent;
  let fixture: ComponentFixture<ProductPhotoDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPhotoDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPhotoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
