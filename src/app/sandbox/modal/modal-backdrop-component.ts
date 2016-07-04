import {Component,HostBinding, AfterViewInit} from '@angular/core';

@Component({
    selector: 'modal-backdrop',
    template: `
        <div>Ceci est mon modal container qui est cool lol</div>
    `,
    directives: [],
    providers : []
})
export default class ModalContainer implements AfterViewInit {

    @HostBinding('class') backdropClass = 'modal-backdrop';

    constructor() {
        console.log("constructor !");
    }

    ngAfterViewInit() {
    }

}
