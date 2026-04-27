import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackToHome } from './back-to-home';

describe('BackToHome', () => {
  let component: BackToHome;
  let fixture: ComponentFixture<BackToHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackToHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackToHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
