import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { TopicChipVerificationState } from '../topic-chip/topic-chip';
import { ExampleVerifiedEvent, Example } from '../example/example';
import { Topic, Language } from '../interfaces';
import { ExampleService } from '../example/example.service';
import { UserService } from '../user.service';

@Component({
  selector: 'mod-example-list',
  templateUrl: './example-list.component.html',
  styleUrls: ['./example-list.component.less'],
})
export class ExampleListComponent implements OnInit {
  @Input() clientId?: number;
  @Input() commitDefaults?: Observable<void>;
  @Input() defaultVerifyState?: TopicChipVerificationState =
    TopicChipVerificationState.DefaultCorrect;
  @Input() highlightText?: string | string[] = [];
  @Input() language?: Language;
  @Input() readOnly? = true;
  @Input() searchText: string;
  @Input() showTopics? = true;

  @Output() exampleDeleted = new EventEmitter<string>();
  @Output() exampleRedacted = new EventEmitter<string>();
  @Output() exampleVerified = new EventEmitter<ExampleVerifiedEvent>();
  @Output() riskChanged = new EventEmitter<Topic>();
  @Output() topicsUpdated = new EventEmitter<Topic[]>();

  error: Error;
  examples: Example[] = [];
  offset = 0;
  limit = 10;
  loading = false;

  constructor(
    private exampleService: ExampleService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getExamples();
  }

  async getExamples(offset?: number, limit?: number): Promise<void> {
    this.loading = true;

    const clientId = this.clientId || this.userService.preferences.lastClientId;
    const language = this.language || {
      language: this.userService.preferences.language,
    };

    try {
      const examples = await this.exampleService.searchExamples(
        this.searchText,
        language,
        clientId,
        offset || this.offset,
        limit || this.limit
      );

      this.examples = examples.items;
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  }

  async moreExamples() {
    this.offset += this.limit;

    this.getExamples(this.offset, this.limit);
  }
}
