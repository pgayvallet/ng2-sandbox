import {Component} from '@angular/core';
import DialogRef from "./dialog-ref";
import ConfirmDialogOptions from "./confirm-dialog-options";

@Component({
    selector: 'tl-confirm-dialog',
    template: `
        <div>Je suis une modale completement dummy</div>
        <div class="footer">
            <button (click)="dismiss()">Dismiss</button>
            <button (click)="close()">Close</button>      
        </div>
    `
})
export default class ConfirmDialogComponent {
    public options : ConfirmDialogOptions;

    constructor(private dialog : DialogRef<ConfirmDialogOptions>) {
        this.options = dialog.context;
    }

    close() {
        this.dialog.close();
    }

    dismiss() {
        this.dialog.dismiss();
    }
    
}
