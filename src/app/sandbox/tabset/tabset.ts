import {Component, ElementRef, ViewContainerRef} from '@angular/core';


@Component({
    selector : 'ts-tabset',
    host : {
        "[class.lapin]" : " true "
    },
    template :
        `
        <div>
            Ceci est un tabset !
        </div>

        `
})
export class Tabset {

    constructor(private el: ElementRef, private vcr : ViewContainerRef ) {

    }


}