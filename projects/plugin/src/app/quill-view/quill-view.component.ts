import { Component, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { AttributeValue } from '@rollthecloudinc/attributes';
import { QuillViewContentHandler } from '../handlers/quill-view-content.handler';
import { TokenizerService } from '@rollthecloudinc/token';
import { map, switchMap } from 'rxjs/operators';
import { QuillViewItem } from '../models/quill.models';
import { Observable } from 'rxjs';

@Component({
    selector: 'solid-quill-quill-view',
    templateUrl: './quill-view.component.html',
    styleUrls: ['./quill-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
      QuillViewContentHandler
    ],
    standalone: false
})
export class QuillViewComponent implements OnInit, OnChanges {

  content = JSON.stringify({});

  @Input()
  settings: Array<AttributeValue> = [];

  @Input()
  tokens: Map<string, any>;

  @Input()
  resolvedContext: any;

  constructor(
    private handler: QuillViewContentHandler,
    private tokenizerService: TokenizerService
  ) { }

  ngOnInit(): void {
    this.handler.toObject(this.settings).pipe(
      switchMap(item => this.resolveContexts().pipe(
        map<Map<string, any>, [QuillViewItem, Map<string, any> | undefined]>(tokens => [item, tokens])
      ))
    ).subscribe(([item, tokens]) => {
      const token = item.token.substring(1, item.token.indexOf(']'));
      console.log('tokens', tokens);
      console.log('item', item);
      console.log('content', tokens.get(token));
      this.content = tokens.get(token)
    });
  }

  // Not sure about this yet... not sure if we need to handle changes or just initialize.
  // I think this is needed for transitions between contexts
  ngOnChanges(): void {
    console.log('pane changed');
    this.handler.toObject(this.settings).pipe(
      switchMap(item => this.resolveContexts().pipe(
        map<Map<string, any>, [QuillViewItem, Map<string, any> | undefined]>(tokens => [item, tokens])
      ))
    ).subscribe(([item, tokens]) => {
      const token = item.token.substring(1, item.token.indexOf(']'));
      /*console.log('tokens', tokens);
      console.log('item', item);
      console.log('content', tokens.get(token));*/
      this.content = tokens.get(token); 
    });
  }

  resolveContexts(): Observable<undefined | Map<string, any>> {
    return new Observable(obs => {
      let tokens = new Map<string, any>();
      if(this.resolvedContext) {
        for(const name in this.resolvedContext) {
          tokens = new Map<string, any>([ ...tokens, ...this.tokenizerService.generateGenericTokens(this.resolvedContext[name], name === '_root' ? '' : name) ]);
        }
      }
      obs.next(tokens);
      obs.complete();
    });
  }

}