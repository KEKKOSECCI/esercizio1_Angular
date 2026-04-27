import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hero404 } from './hero-404';

describe('Hero404', () => {
  let component: Hero404;
  let fixture: ComponentFixture<Hero404>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero404]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hero404);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
