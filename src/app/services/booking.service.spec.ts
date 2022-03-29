import { TestBed } from '@angular/core/testing';
import { Product } from '../models/booking';

import { ProductsService } from './booking.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});

