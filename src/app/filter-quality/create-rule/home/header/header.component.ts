import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { has } from 'lodash';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { ConstantsService } from 'src/app/services/constants.service';
import { FilterService, FilterType } from 'src/app/services/filter.service';

@Component({
  selector: 'app-create-rule-home-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class CreateRuleHomeHeaderComponent implements OnInit {

  constructor(
    // private router: Router,
    // private activatedRoute: ActivatedRoute,
    // private constantsService: ConstantsService,
    // private filterService: FilterService
  ) { }

  ngOnInit() { }
}
