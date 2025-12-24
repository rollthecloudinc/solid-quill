import { Component, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { AttributeValue } from '@rollthecloudinc/attributes';
import { QuillViewContentHandler } from '../handlers/quill-view-content.handler';
// import { TokenizerService } from '@rollthecloudinc/token';
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

  content = []

  @Input()
  settings: Array<AttributeValue> = [];

  @Input()
  tokens: Map<string, any>;

  @Input()
  resolvedContext: any;

  constructor(
    private handler: QuillViewContentHandler
    //private tokenizerService: TokenizerService
  ) { }

  ngOnInit(): void {
    this.handler.toObject(this.settings).pipe(
      switchMap(item => this.resolveContexts().pipe(
        map<Map<string, any>, [QuillViewItem, Map<string, any> | undefined]>(tokens => [item, tokens])
      ))
    ).subscribe(([item, tokens]) => {
      const token = item.token.substring(1, item.token.indexOf(']'));
      /*console.log('tokens', tokens);
      console.log('item', item);
      console.log('content', tokens.get(token));*/
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
      this.content = tokens.get(token)
    });
  }

  resolveContexts(): Observable<undefined | Map<string, any>> {
    return new Observable(obs => {
      let tokens = new Map<string, any>();
      if(this.resolvedContext) {
        for(const name in this.resolvedContext) {
          tokens = new Map<string, any>([ ...tokens, ...this/*.tokenizerService*/.generateGenericTokens(this.resolvedContext[name], name === '_root' ? '' : name) ]);
        }
      }
      obs.next(tokens);
      obs.complete();
    });
  }

  /**
   * Special edge case for handling tokens as raw data objects rather than strings since
   * the tokenizer service is designed to handle string tokens. This is not really how tokens
   * should be handled but it is an acceptable feature enhancement for this specific use case.
   */
  generateGenericTokens(obj: any, prefix = ''): Map<string, any> {
    const tokens = new Map<string, string>();
    this.genericTokens(obj, tokens, prefix, 0);
    return tokens;
  }

  genericTokens(obj: any, tokens: Map<string,any>, prefix, level) {
    for(const prop in obj) {
      const type = typeof(obj[prop]);
      if(type !== 'object') {
        tokens.set(`${prefix}.${prop}`, obj[prop]);
      } /*else if(Array.isArray(obj[prop]) && prop === 'attributes') {
        this.attributeTokens(obj[prop], tokens, `${prefix}.${prop}`, level + 1);
      }*/ else if(Array.isArray(obj[prop])) {
        var len = obj[prop].length;
        for(let i = 0; i < len; i++) {
          this.genericTokens(obj[prop][i], tokens, `${prefix}.${prop}.${i}`, level + 1);
        }
      } else {
        // This sets the object itself as a token.
        tokens.set(`${prefix}.${prop}`, obj[prop]);
        this.genericTokens(obj[prop], tokens, `${prefix}.${prop}`, level + 1);
      }
    }
  }

}