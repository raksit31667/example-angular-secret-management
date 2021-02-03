import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSelectComponent } from './language-select.component';

describe('LanguageSelectComponent', () => {
  let component: LanguageSelectComponent;
  let fixture: ComponentFixture<LanguageSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit onSelectLanguage when change selected language', () => {
    // Given
    component.languages = ['en', 'th'];
    fixture.detectChanges();
    spyOn(component.onSelectLanguage, 'emit');
    const select = fixture.nativeElement.querySelector('select');
    select.value = select.options[1].value;

    // When
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    // Then
    expect(component.onSelectLanguage.emit).toHaveBeenCalledWith('th');
  });
});
