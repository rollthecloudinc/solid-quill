import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'solid-quill-quill-view',
    templateUrl: './quill-view.component.html',
    styleUrls: ['./quill-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class QuillViewComponent {

  content = [
    { insert: 'Hello ' },
    { insert: 'World!', attributes: { bold: true } },
    { insert: '\n' }
  ]

}