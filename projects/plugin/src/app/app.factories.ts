import { ContentHandler, ContentPlugin } from '@rollthecloudinc/content';
import { DownloadComponent } from './download.component';
import { DownloadContentHandler } from './handlers/download-content.handler';
import { QuillContentHandler } from './handlers/quill-content.handler';
import { QuillComponent } from './quill/quill.component';
import { QuillViewComponent } from './quill-view/quill-view.component';
import { QuillViewContentHandler } from './handlers/quill-view-content.handler';
import { QuillViewEditorComponent } from './quill-view-editor/quill-view-editor.component';

export const pluginDownloadContentPluginFactory  = ({ handler }: { handler: DownloadContentHandler }) => {
  return new ContentPlugin<string>({
    id: 'plugin_download',
    title: 'Plugin Download',
    selectionComponent: undefined,
    editorComponent: undefined,
    renderComponent: DownloadComponent,
    handler
  } as any);
};

export const pluginQuillContentPluginFactory  = ({ handler }: { handler: ContentHandler }) => {
  return new ContentPlugin<string>({
    id: 'plugin_quill',
    title: 'Quill Editor',
    selectionComponent: undefined,
    editorComponent: undefined,
    renderComponent: QuillComponent,
    handler
  } as any);
};

export const pluginQuillViewContentPluginFactory  = ({ handler }: { handler: QuillViewContentHandler }) => {
  return new ContentPlugin<string>({
    id: 'plugin_quill_view',
    title: 'Quill View',
    selectionComponent: undefined,
    editorComponent: QuillViewEditorComponent,
    renderComponent: QuillViewComponent,
    handler
  } as any);
};

