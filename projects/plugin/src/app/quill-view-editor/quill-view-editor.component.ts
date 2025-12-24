import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pane } from '@rollthecloudinc/panels';
import { AttributeSerializerService } from '@rollthecloudinc/attributes';
import { QuillViewItem } from '../models/quill.models';
import { QuillViewContentHandler } from '../handlers/quill-view-content.handler';

@Component({
    selector: 'solid-quill-view-editor',
    templateUrl: './quill-view-editor.component.html',
    styleUrls: ['quill-view-editor.component.scss'],
    standalone: false,
    providers: [
        QuillViewContentHandler
    ],
})

export class QuillViewEditorComponent implements OnInit {

    private dialogRef = inject(MatDialogRef<QuillViewEditorComponent>);
    private dialogData: { panelFormGroup: UntypedFormGroup; paneIndex: number; pane: Pane } = inject(MAT_DIALOG_DATA);
    private handler = inject(QuillViewContentHandler);
    private attributeSerializer = inject(AttributeSerializerService);    
    
    quillViewItem: QuillViewItem;
    
    readonly contentForm = new FormGroup({
        token: new FormControl<string>(''),
    });
    
    constructor(
    ) { 
        console.log('quill view editor component constructor');
    }

    ngOnInit() { 
        if(this.dialogData.pane !== undefined) {
            this.handler.toObject(this.dialogData.pane.settings).subscribe((quillViewItem: QuillViewItem) => {
                this.quillViewItem = quillViewItem;
                this.contentForm.get('token').patchValue(this.quillViewItem.token);
            });
        }
    }

    submit() {
        let paneIndex: number;
        if(this.dialogData.paneIndex === undefined) {
            (this.dialogData.panelFormGroup.get('panes') as UntypedFormArray).push(new FormGroup({
                contentPlugin: new UntypedFormControl('quill_view_item'),
                name: new UntypedFormControl(''),
                label: new UntypedFormControl(''),
                rule: new UntypedFormControl(''),
                settings: new UntypedFormArray([])
            }));
            paneIndex = (this.dialogData.panelFormGroup.get('panes') as UntypedFormArray).length - 1;
        } else {
            paneIndex = this.dialogData.paneIndex;
        }
        const paneForm = (this.dialogData.panelFormGroup.get('panes') as UntypedFormArray).at(paneIndex);
        const token = this.contentForm.get('token').value;

        const quillViewItem = new QuillViewItem({ token });

        (paneForm.get('settings') as UntypedFormArray).clear();
        const controls = this.handler.buildSettings(quillViewItem).map(s => this.attributeSerializer.convertToGroup(s));
        controls.forEach(c => (paneForm.get('settings') as UntypedFormArray).push(c));

        this.dialogRef.close();   
    }
}