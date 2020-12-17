import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TopicInfoComponent } from './topic-info.component';

describe('TopicInfoComponent', () => {
    let component: TopicInfoComponent;
    let fixture: ComponentFixture<TopicInfoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TopicInfoComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TopicInfoComponent);
        component = fixture.componentInstance;
        const topic: any = {
            color: 'red',
            icon: 'comments',
            name: 'test',
            value: 'test'
        }
        component.topic = topic;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
