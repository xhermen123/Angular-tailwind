import { QueueItemTagsComponent } from './queue-item-tags.component';
import { QueueLabelGroup } from 'src/app/base-queue/interfaces/queue-label-group.interface';

const labelGroups: QueueLabelGroup[] = [
  {
    multiple: true,
    options: [
      {
        name: 'Correct',
        value: 'CORRECT',
      },
      {
        name: 'Wrong',
        value: 'WRONG',
      },
    ],
  },
  {
    ifTag: 'WRONG',
    multiple: false,
    options: [
      {
        name: 'Bad',
        value: 'WRONG.BAD',
      },
      {
        name: 'Silly',
        value: 'WRONG.SILLY',
      },
    ],
  },
];

describe('QueueItemTagsComponent', () => {
  describe('#set labelGroups', () => {
    it('should set the optionButtonGroups on the component', () => {
      const tagsComponent = new QueueItemTagsComponent();
      expect(tagsComponent.optionButtonGroups).toBeFalsy();

      tagsComponent.tags = [];
      tagsComponent.labelGroups = labelGroups;

      const expected = [
        {
          value: [],
          multiple: true,
          ifTag: '',
          options: [
            {
              value: 'CORRECT',
              label: 'Correct',
              ariaLabel: 'Correct',
            },
            {
              value: 'WRONG',
              label: 'Wrong',
              ariaLabel: 'Wrong',
            },
          ],
        },
        {
          value: '',
          multiple: false,
          ifTag: 'WRONG',
          options: [
            {
              value: 'WRONG.BAD',
              label: 'Bad',
              ariaLabel: 'Bad',
            },
            {
              value: 'WRONG.SILLY',
              label: 'Silly',
              ariaLabel: 'Silly',
            },
          ],
        },
      ];

      expect(tagsComponent.optionButtonGroups).toEqual(expected);
    });

    it('should set values based on the tags', () => {
      const tagsComponent = new QueueItemTagsComponent();
      tagsComponent.tags = ['CORRECT'];
      tagsComponent.labelGroups = labelGroups;
      expect(tagsComponent.optionButtonGroups[0].value).toEqual(['CORRECT']);
      expect(tagsComponent.optionButtonGroups[1].value).toEqual('');

      tagsComponent.tags = ['CORRECT', 'WRONG'];
      tagsComponent.labelGroups = labelGroups;
      expect(tagsComponent.optionButtonGroups[0].value).toEqual([
        'CORRECT',
        'WRONG',
      ]);
      expect(tagsComponent.optionButtonGroups[1].value).toEqual('');

      tagsComponent.tags = ['CORRECT', 'WRONG.BAD'];
      tagsComponent.labelGroups = labelGroups;
      expect(tagsComponent.optionButtonGroups[0].value).toEqual(['CORRECT']);
      expect(tagsComponent.optionButtonGroups[1].value).toEqual('WRONG.BAD');

      tagsComponent.tags = ['WRONG', 'WRONG.BAD'];
      tagsComponent.labelGroups = labelGroups;
      expect(tagsComponent.optionButtonGroups[0].value).toEqual(['WRONG']);
      expect(tagsComponent.optionButtonGroups[1].value).toEqual('WRONG.BAD');
    });
  });

  describe('#onSelectedOptionsChanged', () => {
    // Tags gets passed by reference into the component
    const state: { tags: string[] } = { tags: [] };
    let onTagsUpdated: jest.Mock<void, [string[]]>;
    let tagsComponent: QueueItemTagsComponent;

    beforeAll(() => {
      onTagsUpdated = jest.fn(updatedTags => {
        state.tags = updatedTags;
      });
    });

    beforeEach(() => {
      state.tags = [];
      onTagsUpdated.mockClear();
      tagsComponent = new QueueItemTagsComponent();
      tagsComponent.tags = state.tags;
      tagsComponent.labelGroups = labelGroups;
      tagsComponent.tagsUpdated.subscribe(onTagsUpdated);
    });

    it('should not emit anything if readOnly is true', () => {
      tagsComponent.readOnly = true;
      tagsComponent.onSelectedOptionsChanged(
        tagsComponent.optionButtonGroups[0],
        ['CORRECT']
      );

      expect(onTagsUpdated).not.toHaveBeenCalled();
      expect(state.tags).toEqual([]);
    });

    it('should emit #tagsUpdated with the updated tags', () => {
      tagsComponent.onSelectedOptionsChanged(
        tagsComponent.optionButtonGroups[0],
        ['CORRECT']
      );

      expect(onTagsUpdated).toHaveBeenCalledTimes(1);
      expect(onTagsUpdated).toHaveBeenCalledWith(['CORRECT']);
      expect(state.tags).toEqual(['CORRECT']);
    });

    it('should not include conditional tags when the parent is not selected', () => {
      tagsComponent.onSelectedOptionsChanged(
        tagsComponent.optionButtonGroups[0],
        ['CORRECT']
      );

      expect(onTagsUpdated).toHaveBeenLastCalledWith(['CORRECT']);
      expect(state.tags).toEqual(['CORRECT']);

      tagsComponent.onSelectedOptionsChanged(
        tagsComponent.optionButtonGroups[1],
        ['WRONG.BAD']
      );

      expect(onTagsUpdated).toHaveBeenLastCalledWith(['CORRECT']);
      expect(state.tags).toEqual(['CORRECT']);

      tagsComponent.onSelectedOptionsChanged(
        tagsComponent.optionButtonGroups[0],
        ['WRONG']
      );

      expect(onTagsUpdated).toHaveBeenLastCalledWith(['WRONG', 'WRONG.BAD']);
      expect(state.tags).toEqual(['WRONG', 'WRONG.BAD']);

      tagsComponent.onSelectedOptionsChanged(
        tagsComponent.optionButtonGroups[0],
        ['CORRECT']
      );

      expect(onTagsUpdated).toHaveBeenLastCalledWith(['CORRECT']);
      expect(state.tags).toEqual(['CORRECT']);
    });
  });
});
