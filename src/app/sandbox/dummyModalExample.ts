import {Component} from '@angular/core';
import DialogRef from "./modal/dialog-ref";

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

    constructor(private dialog : DialogRef) {
        console.log("dummy modal : dialog = ", dialog);
    }


    close() {
        this.dialog.close();
    }

    dismiss() {
        this.dialog.dismiss();
    }


}
