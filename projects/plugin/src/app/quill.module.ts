import { NgModule } from '@angular/core';
import { ContentPluginManager } from '@rollthecloudinc/content';
import { pluginQuillContentPluginFactory } from './app.factories';
import { CommonModule } from '@angular/common';
import { QuillContentHandler } from './handlers/quill-content.handler';
import { QuillComponent } from './quill/quill.component';
import { QuillModule as QModule } from 'ngx-quill'

@NgModule({
  imports: [
    CommonModule,
    QModule.forRoot()
  ],
  declarations: [
    QuillComponent
  ],
  providers: [
    QuillContentHandler
  ],
  exports: [
    QuillComponent
  ]
})
export class QuillModule { 
  constructor(
    cpm: ContentPluginManager,
    quillContentHandler: QuillContentHandler
  ) {
    console.log('register plugin quill content plugin');
    // @todo: lint not picking up register() because in plugin module base class.
    cpm.register(pluginQuillContentPluginFactory({ handler: quillContentHandler }));
  }
}
