import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotesDataService, Page } from 'src/services/notes-data.service';
import { Utilities } from 'src/utils/utilities.class';

@Component({
    selector: 'app-page-editor',
    templateUrl: 'page-editor.component.html',
    styleUrls: ['page-editor.component.scss']
})

export class PageEditorComponent extends Utilities implements OnInit {
    BookID: number = 0;
    PageID: number = 0;
    Page: Page = new Page();
    PageReadOnly: Page = new Page();

    Languages: string[] = ['abap', 'aes', 'apex', 'azcli', 'bat', 'c', 'cameligo', 'clojure', 'coffeescript', 'cpp', 'csharp', 'csp', 'css', 'dart', 'dockerfile', 'ecl', 'fsharp', 'go', 'graphql', 'handlebars', 'hcl', 'html', 'ini', 'java', 'javascript', 'json', 'julia', 'kotlin', 'less', 'lexon', 'lua', 'm3', 'markdown', 'mips', 'msdax', 'mysql', 'objective-c', 'pascal', 'pascaligo', 'perl', 'pgsql', 'php', 'plaintext', 'postiats', 'powerquery', 'powershell', 'pug', 'python', 'r', 'razor', 'redis', 'redshift', 'restructuredtext', 'ruby', 'rust', 'sb', 'scala', 'scheme', 'scss', 'shell', 'sol', 'sql', 'st', 'swift', 'systemverilog', 'tcl', 'twig', 'typescript', 'vb', 'verilog', 'xml', 'yaml' ];

    constructor(private dataService: NotesDataService, private route: ActivatedRoute) {
        super();
    }

    getPageMetadata() {
        this.dataService.getPage(this.PageID).then(data => {
            if(data) {
                this.Page = data;
                this.PageReadOnly.PageData = data.PageData;
            }
        })
    }

    PageSaveInit: boolean = false;
    storePage() {
        this.PageSaveInit = true;
        this.debounce('updateNotebook', 1000, () => {
            this.dataService.storePage(this.Page).then(data => {
                this.PageSaveInit = false;
            });
        })
    }
    
    savePageData(DescriptionData: string | null) {
        if(this.Page.PageData === DescriptionData) return;
        this.Page.PageData = DescriptionData || '';
        this.storePage();
    }

    ngOnInit() {
        this.unSubscribeLater(this.route.queryParamMap.subscribe(params => {
            this.BookID = Number(params.get('BookID'));
            this.PageID = Number(params.get('PageID'));
            this.getPageMetadata();
        }));
    }
}