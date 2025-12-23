import { Component, ViewEncapsulation } from '@angular/core';
import { FormElementBase } from '@rollthecloudinc/forms';

@Component({
    selector: 'solid-quill-quill',
    templateUrl: './quill.component.html',
    styleUrls: ['./quill.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})

export class QuillComponent extends FormElementBase {
}