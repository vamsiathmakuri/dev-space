/// <reference path="../../../../../node_modules/monaco-editor/monaco.d.ts" />
import { Component, Input, AfterViewInit, ElementRef, ViewChild, NgZone, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';



let loadedMonaco = false;
let loadPromise: Promise<void>;

@Component({
  selector: 'app-monaco-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements AfterViewInit, OnChanges {

  @ViewChild('editorContainer') _editorContainer: ElementRef | undefined;

  @Input() code: string = '';
  @Input() language: string = '';
  @Output() codeChange = new EventEmitter<string>();

  Languages = ['abap', 'aes', 'apex', 'azcli', 'bat', 'c', 'cameligo', 'clojure', 'coffeescript', 'cpp', 'csharp', 'csp', 'css', 'dart', 'dockerfile', 'ecl', 'fsharp', 'go', 'graphql', 'handlebars', 'hcl', 'html', 'ini', 'java', 'javascript', 'json', 'julia', 'kotlin', 'less', 'lexon', 'lua', 'm3', 'markdown', 'mips', 'msdax', 'mysql', 'objective-c', 'pascal', 'pascaligo', 'perl', 'pgsql', 'php', 'plaintext', 'postiats', 'powerquery', 'powershell', 'pug', 'python', 'r', 'razor', 'redis', 'redshift', 'restructuredtext', 'ruby', 'rust', 'sb', 'scala', 'scheme', 'scss', 'shell', 'sol', 'sql', 'st', 'swift', 'systemverilog', 'tcl', 'twig', 'typescript', 'vb', 'verilog', 'xml', 'yaml']

  // Holds instance of the current code editor
  codeEditorInstance: monaco.editor.IStandaloneCodeEditor | undefined;

  constructor(private zone: NgZone) { }

  // supports two-way binding
  ngOnChanges(changes: SimpleChanges) {
    if (this.codeEditorInstance) {
      const editorModel = this.codeEditorInstance.getModel();
      if(editorModel) {
        if(changes['code']) {
          editorModel.setValue(this.code)
        } else if(changes['language']) {
          monaco.editor.setModelLanguage(editorModel, this.language || 'javascript');
        }
      }
    }
  }

  ngAfterViewInit() {
    if (loadedMonaco) {
      // Wait until monaco editor is available
      loadPromise.then(() => {
        this.initMonaco();
      });
    } else {
      loadedMonaco = true;
      loadPromise = new Promise<void>((resolve: any) => {
        if (typeof ((<any>window).monaco) === 'object') {
          resolve();
          return;
        }
        const onAmdLoader: any = () => {
          // Load monaco
          (<any>window).require.config({ paths: { 'vs': 'assets/monaco/vs' } });

          (<any>window).require(['vs/editor/editor.main'], () => {
            this.initMonaco();
            resolve();
          });
        };

        // Load AMD loader if necessary
        if (!(<any>window).require) {
          const loaderScript: HTMLScriptElement = document.createElement('script');
          loaderScript.type = 'text/javascript';
          loaderScript.src = 'assets/monaco/vs/loader.js';
          loaderScript.addEventListener('load', onAmdLoader);
          document.body.appendChild(loaderScript);
        } else {
          onAmdLoader();
        }
      });
    }
  }

  initMonaco(): void {
    this.codeEditorInstance = monaco.editor.create(this._editorContainer?.nativeElement, {
      value: this.code,
      language: this.language || 'javascript',
      theme: 'vs-dark'
    });

    // To support two-way binding of the code
    this.codeEditorInstance?.getModel()?.onDidChangeContent(e => {
      this.codeChange.emit(this.codeEditorInstance?.getValue());
    });
  }
}