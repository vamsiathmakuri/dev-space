import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'notes-navigation',
    templateUrl: 'navigation.component.html',
    styleUrls: ['navigation.component.scss']
})

export class NavigationComponent implements OnInit {
    temp: boolean = false;
    tempBooks: Array<number> = new Array(10).fill(1);
    
    // Logic for Adding Notebooks
    showAddNotebookInput: boolean = false;
    newNotebookName: string = '';

    @ViewChild('addNote')
    inputReference!: ElementRef<HTMLInputElement>;

    showInput() {
        this.newNotebookName = '';
        this.showAddNotebookInput = true; 
        setTimeout(() => {
            this.inputReference.nativeElement.focus()
        }, 100)
    }

    createNewNotebook() {
        if(this.newNotebookName) {
            // Create Note and Select
            alert(this.newNotebookName)
            this.showAddNotebookInput = false;
        }
    }

    // Notebooks Listing
    
    constructor() { }

    ngOnInit() { }
}