import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  isRuleTextEdit: boolean;
  ruleText: string;
  splitRuleWords: Array<string>;
  steps: Array<any>;

  constructor() { }

  ngOnInit(): void {
    this.ruleText = 'bad words are bad';
    this.splitRuleWords = this.ruleText.split(" ");
    this.steps = [
      {
        id: 'fix_spelling',
        title: 'Fix Spelling',
        status: 0
      },
      {
        id: 'neibouring_words',
        title: 'Neibouring Words',
        status: 0
      },
      {
        id: 'smart_rules',
        title: 'Smart Rules',
        status: 0
      },
      {
        id: 'add_topics',
        title: 'Add Topics',
        status: 0
      },
      {
        id: 'details',
        title: 'Details',
        status: 0
      },
      {
        id: 'flags',
        title: 'Flags',
        status: 0
      },
      {
        id: 'discussion',
        title: 'Discussion',
        status: 0
      },
      {
        id: 'test',
        title: 'Test',
        status: 0
      }
    ]
  }

}
