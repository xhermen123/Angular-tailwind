import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { sortBy } from 'lodash';

import { Languages, Language } from 'src/constants';
import { UserService } from 'src/app/shared-components/user.service';

@Component({
  selector: 'main-language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.less'],
})
export class LanguagePickerComponent implements OnInit {
  @Input()
  set selectedLanguage(languageCode: string) {
    this._selectedLanguage = this.languages.find(
      (language) => language.code === languageCode
    );
    if (!this._selectedLanguage) {
      this._selectedLanguage = {
        code: languageCode,
        name: languageCode,
      };
    }
  }
  @Output() languageChanged = new EventEmitter<string>();

  languages: Language[] = [];

  private _selectedLanguage: Language;

  get selectedLanguageCode() {
    return this._selectedLanguage?.code;
  }

  get selectedLanguageName() {
    return this._selectedLanguage?.name || '-';
  }

  constructor(private userService: UserService) {}

  async ngOnInit() {
    // Get the current user
    const user = await this.userService.me();

    // Filter the user's languages by the ones they're allowed to use
    if (user?.config?.allowedLanguages) {
      this.languages = Languages.filter((lang) =>
        user.config.allowedLanguages.includes(lang.code)
      );
    }

    // Sort by language name, not code.
    this.languages = sortBy(this.languages, 'name');

    this._selectedLanguage = this.languages.find(
      (language) => language.code === this.selectedLanguageCode
    );
  }

  /**
   * Fired when the user changes their language
   */
  onLanguageChanged(languageCode: string) {
    this.languageChanged.emit(languageCode);
  }
}
