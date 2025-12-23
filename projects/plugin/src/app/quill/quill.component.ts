import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ContentPluginManager } from '@rollthecloudinc/content';

@Component({
    selector: 'solid-quill-quill',
    templateUrl: './quill.component.html',
    styleUrls: ['./quill.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})

export class QuillComponent implements OnInit {
    constructor(
        private cpm: ContentPluginManager
    ) { 
        console.log('quill component constructor');
    }

    ngOnInit() { }
}