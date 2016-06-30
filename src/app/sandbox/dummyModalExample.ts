import {Component} from '@angular/core';

@Component({
    selector: 'dummy-modal-example',
    template: `
        <div>Je suis une modale completement dummy</div>
    `,
    directives: [],
    providers : []
})
export default class DummyModalExample {
    public appBrand: string;

    constructor() {
    }


}
