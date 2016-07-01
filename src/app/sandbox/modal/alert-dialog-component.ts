import {Component} from '@angular/core';
import DialogRef from "./dialog-ref";
import AlertDialogOptions from "./alert-dialog-options";

@Component({
    selector: 'tl-alert-dialog',
    template: `
        <div>{{options.text}}</div>
        <div class="footer">
            <button (click)="close()">Close</button>      
        </div>
    `
})
export default class AlertDialogComponent {
    public options : AlertDialogOptions;

    constructor(private dialog : DialogRef<AlertDialogOptions>) {
        this.options = dialog.context;
    }

    close() {
        this.dialog.close();
    }

    dismiss() {
        this.dialog.dismiss();
    }


}
