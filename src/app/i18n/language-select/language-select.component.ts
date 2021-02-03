import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss']
})
export class LanguageSelectComponent {

  @Input() languages: string[];
  @Input() currentLanguage: string;
  @Output() onSelectLanguage: EventEmitter<string>;

  constructor() {
    this.languages = [];
    this.currentLanguage = '';
    this.onSelectLanguage = new EventEmitter<string>();
  }

  selectLanguage(value: string) {
    this.onSelectLanguage.emit(value);
  }
}
