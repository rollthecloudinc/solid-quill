import { NgModule } from '@angular/core';
import { ContentPluginManager } from '@rollthecloudinc/content';
import { MaterialModule } from '@rollthecloudinc/material';
import { pluginQuillContentPluginFactory, pluginQuillViewContentPluginFactory } from './app.factories';
import { CommonModule } from '@angular/common';
import { QuillContentHandler } from './handlers/quill-content.handler';
import { QuillComponent } from './quill/quill.component';
import { QuillModule as QModule } from 'ngx-quill'
import { ReactiveFormsModule } from '@angular/forms';
import { FormElementHandler } from '@rollthecloudinc/forms';
import { QuillViewComponent } from './quill-view/quill-view.component';
import { QuillViewContentHandler } from './handlers/quill-view-content.handler';
import { QuillViewEditorComponent } from './quill-view-editor/quill-view-editor.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    QModule.forRoot()
  ],
  declarations: [
    QuillComponent,
    QuillViewComponent,
    QuillViewEditorComponent
  ],
  providers: [
    // QuillContentHandler
    QuillViewContentHandler
  ],
  exports: [
    QuillComponent,
    QuillViewComponent,
    QuillViewEditorComponent
  ]
})
export class QuillModule { 
  constructor(
    cpm: ContentPluginManager,
    handler: FormElementHandler,
    viewHandler: QuillViewContentHandler
  ) {
    console.log('register plugin quill content plugin');
    // @todo: lint not picking up register() because in plugin module base class.
    cpm.register(pluginQuillContentPluginFactory({ handler }));
    cpm.register(pluginQuillViewContentPluginFactory({ handler: viewHandler }));
  }
}
