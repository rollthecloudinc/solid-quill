import { Component } from "@angular/core";
import { FormElementEditorComponent } from "@rollthecloudinc/forms";

@Component({
    selector: 'solid-quill-editor',
    templateUrl: './quill-editor.component.html',
    styleUrls: ['./quill-editor.component.scss'],
    standalone: false
})
export class QuillEditorComponent extends FormElementEditorComponent {
}