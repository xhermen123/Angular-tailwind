import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnChanges,
} from '@angular/core';
import { cloneDeep, unset } from 'lodash';

import { Languages } from 'src/constants';
import { QueueItemExtras } from '../interfaces';

export enum AlternateTypes {
  AltSense = 'altSenses',
  AltSpelling = 'altSpellings',
  Flags = 'flags',
  Language = 'language',
  LeetMappings = 'leet_mappings',
}

export interface AlternativeTag {
  altType: AlternateTypes;
  value: string;
}

@Component({
  selector: 'mod-alternatives',
  templateUrl: './alternatives.component.html',
})
export class AlternativesComponent implements OnChanges {
  // Properties
  @Input() disabled = false;
  @Input() extras: QueueItemExtras;
  @Input() tags: string[] = [];

  @Output() alternativeAdded: EventEmitter<any> = new EventEmitter();
  @Output() alternativesChanged: EventEmitter<
    QueueItemExtras
  > = new EventEmitter();

  // Locals
  _extras: QueueItemExtras;
  altTypes = AlternateTypes;
  correctWord = ''; // initializing Word 1st to empty for the input field where user enter the correct word to create tag for 1st mistake
  mergedTags: AlternativeTag[] = [];
  showWordsList = false; // show dummy words list flag

  ngOnChanges() {
    this._extras = cloneDeep(this.extras) || {};
    this._extras.altSenses = this._extras.altSenses || [];
    this._extras.altSpellings = this._extras.altSpellings || [];
  }

  /**
   * Add a new language, alt sense, or alt spelling alt
   * @param value The value of the alt to add
   * @param altType The type of the alt to add
   */
  addAlternative(value: string, altType: AlternateTypes) {
    // Validate
    if (!value || !altType) return;

    // Prevent duplicates
    if (this._extras[altType].some((val) => val === value)) {
      return this.alternativeAdded.emit();
    }

    // Remove AI predictions from changed languages
    if (altType === AlternateTypes.Language) unset(value, 'detected');

    // Add the word to the extras stack
    const newExtras = { ...this._extras };
    newExtras[altType] = [...newExtras[altType], value];

    // Write the value back to the model
    this.writeValue(newExtras);

    // Clear the parent input
    this.alternativeAdded.emit();
  }

  /**
   * Get a friendly language name for a given code
   * @param languageCode The langauge code to look up
   */
  languageName(languageCode = '') {
    const language = Languages.find((lang) => lang.code === languageCode);
    return language?.name || '';
  }

  /**
   * Remove languages, alt spells, and alt senses
   * @param value The value of the alternative to remove
   * @param altType The type of the alternative to remove
   */
  removeAlternative(value: string, altType: AlternateTypes) {
    // Validate
    if (!value || !altType) return;

    // Remove the alt from the stack
    const filteredExtras = { ...this._extras };
    filteredExtras[altType] = filteredExtras[altType].filter(
      (alt) => !(alt === value)
    );

    // Write the value back to the model
    this.writeValue(filteredExtras);
  }

  /**
   * Write back to the model value
   * @param extras The extras object to write to
   */
  writeValue(extras: QueueItemExtras) {
    if (!extras) return;

    // Handle unset values
    this._extras = extras;

    // Update the mergedTags object with the current UI state
    this.mergedTags = Object.entries(this._extras || {}).flatMap((entry) => {
      const [altType, values] = entry;
      return values.map(
        (value) => ({ altType: altType, value } as AlternativeTag)
      );
    });

    // Trigger the change event
    this.alternativesChanged.emit(this._extras);
  }
}
