import { Component, ViewEncapsulation } from '@angular/core';
import { FormElementBase } from '@rollthecloudinc/forms';
import { debounceTime, tap } from 'rxjs';

@Component({
    selector: 'solid-quill-quill',
    templateUrl: './quill.component.html',
    styleUrls: ['./quill.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})

export class QuillComponent extends FormElementBase {

    readonly logValueChangesSub = this.formControl.valueChanges.pipe(
        debounceTime(1000),
        tap(v => {
            console.log('quill value changes', v);
        })
    ).subscribe();

}