import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ContentChange } from 'ngx-quill';
import { Journal, JournalDataService } from 'src/services/journal-data.service';
import { Utilities } from 'src/utils/utilities.class';

@Component({
    selector: 'app-journal',
    templateUrl: 'journal.component.html',
    styleUrls: ['journal.component.scss']
})

export class JournalComponent extends Utilities implements OnInit {

    constructor(private dataService: JournalDataService) {
        super();
    }

    SelectedDate: Date = new Date();
    DateRange: Array<Date> = [];
    MiddleDate: Date = new Date();

    Months: Array<string> = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    Days: Array<string> = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    JournalData: Journal = new Journal();
    EditorText: string = '';

    dateToString(date: Date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    initializeDateRange(initDate: Date) {
        const DateRange = [];
        for (let offset = -5; offset <= 5; offset++) {
            let date = new Date(
                initDate.getFullYear(),
                initDate.getMonth(),
                initDate.getDate() + offset
            );
            DateRange.push(date);
            if (offset === 0) this.MiddleDate = date;
        }
        this.DateRange = DateRange;
    }

    dateViewChange(offset: number) {
        let date = new Date(
            this.MiddleDate.getFullYear(),
            this.MiddleDate.getMonth(),
            this.MiddleDate.getDate() + offset
        );

        this.initializeDateRange(date)
    }

    getJournal() {
        this.dataService.getJournal(
            this.dateToString(this.SelectedDate)
        ).then(result => {
            if(result) {
                return result;
            } else {
                const newJournalData = new Journal();
                newJournalData.Date = this.dateToString(this.SelectedDate);
                return newJournalData;
            }
        }).then(data => {
            this.JournalData = data;
            this.EditorText = this.JournalData.Data;
        })
    }

    JournalSaveInit: boolean = false;

    saveJournal(data: ContentChange) {
        this.JournalSaveInit = true;
        this.debounce('save', 1000, () => {
            this.JournalData.Data = data.html || '';
            this.JournalData.Modified = new Date();
            this.dataService.storeJournal(this.JournalData).then(() => {
                this.JournalSaveInit = false;
            })
        })
    }

    applyDate() {
        this.getJournal()
    }

    ngOnInit() {
        this.initializeDateRange(this.SelectedDate)
        this.applyDate()
    }
}