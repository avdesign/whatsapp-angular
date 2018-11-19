import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInputSearchComponent } from './product-input-search.component';

describe('ProductInputSearchComponent', () => {
  let component: ProductInputSearchComponent;
  let fixture: ComponentFixture<ProductInputSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductInputSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInputSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
