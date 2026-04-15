import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroInsert } from './hero-insert';

describe('HeroInsert', () => {
  let component: HeroInsert;
  let fixture: ComponentFixture<HeroInsert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroInsert]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroInsert);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
