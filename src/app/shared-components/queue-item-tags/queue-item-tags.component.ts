import { Component, Input, Output, EventEmitter } from '@angular/core';
import { QueueLabelGroup } from '../../base-queue/interfaces/queue-label-group.interface';
import { IOptionButton } from '../option-button-group/option-button-group.component';

interface OptionButtonGroup {
  value: string | string[];
  multiple: boolean;
  ifTag: string;
  options: IOptionButton[];
}

@Component({
  selector: 'mod-queue-item-tags',
  templateUrl: './queue-item-tags.component.html',
  styleUrls: ['./queue-item-tags.component.less'],
})
export class QueueItemTagsComponent {
  @Output() tagsUpdated = new EventEmitter<string[]>();

  @Input() readOnly = false;
  @Input() tags: string[];

  @Input()
  set labelGroups(labelGroups: QueueLabelGroup[]) {
    this.optionButtonGroups = this.getOptionButtonGroupsFromLabelGroups(
      labelGroups
    );

    // Required to resolve a change detection issue.
    // If the value of tags is different at the beginning of the change
    // detection cycle than it is at the end then Angular gets upset.
    window.setTimeout(() => this.updateTags(), 0);
  }

  optionButtonGroups: OptionButtonGroup[];

  onSelectedOptionsChanged(
    optionButtonGroup: OptionButtonGroup,
    selectedOption: string | string[]
  ) {
    if (this.readOnly) return;
    optionButtonGroup.value = selectedOption;
    this.updateTags();
  }

  private updateTags() {
    let updatedTags: string[] = [];
    for (const optionButtonGroup of this.optionButtonGroups) {
      if (
        !optionButtonGroup.ifTag ||
        updatedTags.indexOf(optionButtonGroup.ifTag) !== -1
      ) {
        updatedTags = updatedTags.concat(optionButtonGroup.value);
      }
    }

    this.tagsUpdated.emit(updatedTags);
  }

  private getOptionButtonGroupsFromLabelGroups(
    labelGroups: QueueLabelGroup[]
  ): OptionButtonGroup[] {
    return labelGroups.map<OptionButtonGroup>(labelGroup => {
      let value: string | string[];

      if (labelGroup.multiple) {
        value = this.tags.filter(tag =>
          labelGroup.options.find(option => option.value === tag)
        );

        if (!value?.length && Array.isArray(labelGroup.defaultValue)) {
          value = labelGroup.defaultValue;
        }
      } else {
        for (const tag of this.tags) {
          if (labelGroup.options.find(option => option.value === tag)) {
            value = tag;
            break;
          }
        }

        if (!value) {
          value = labelGroup.defaultValue || '';
        }
      }

      return {
        value,
        multiple: labelGroup.multiple,
        ifTag: labelGroup.ifTag || '',
        options: labelGroup.options.map(option => ({
          value: option.value,
          label: option.name,
          ariaLabel: option.name,
        })),
      };
    });
  }
}
