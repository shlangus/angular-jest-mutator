import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-jest-mutator'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-jest-mutator');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.title')?.textContent).toContain('angular-jest-mutator');
  });

  describe('Weird tests should be bad at killing mutants', () => {
    it('expect(true)', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();

      expect(true).toBe(true);
    });

    it('expect type', () => {
      const fixture = TestBed.createComponent(AppComponent);

      expect(typeof fixture.componentInstance.sum(1, 2)).toBe('number');
    });

    it('truthy', () => {
      const fixture = TestBed.createComponent(AppComponent);

      expect(fixture.componentInstance.gt(2)(1)).toBeTruthy();
    });
  });
});
