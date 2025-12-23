import { ContentPlugin } from '@rollthecloudinc/content';
import { DownloadComponent } from './download.component';
import { DownloadContentHandler } from './handlers/download-content.handler';
import { QuillContentHandler } from './handlers/quill-content.handler';
import { QuillComponent } from './quill/quill.component';

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

export const pluginQuillContentPluginFactory  = ({ handler }: { handler: QuillContentHandler }) => {
  return new ContentPlugin<string>({
    id: 'plugin_quill',
    title: 'Quill Editor',
    selectionComponent: undefined,
    editorComponent: undefined,
    renderComponent: QuillComponent,
    handler
  } as any);
};