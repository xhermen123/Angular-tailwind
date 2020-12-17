import {NgModule,Component,Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {EventEmitter} from '@angular/core';

@Component({
    selector: 'app-percent-bar',
    templateUrl: './app-percent-bar.component.html',
    styleUrls: ['./app-percent-bar.component.less']
})
export class AppPercentBarComponent {
    @Input() percent: number;

    constructor() { }
}