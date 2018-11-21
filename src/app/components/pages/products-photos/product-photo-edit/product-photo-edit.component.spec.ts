import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPhotoEditComponent } from './product-photo-edit.component';

describe('ProductPhotoEditComponent', () => {
  let component: ProductPhotoEditComponent;
  let fixture: ComponentFixture<ProductPhotoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPhotoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPhotoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
