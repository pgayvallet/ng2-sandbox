import {ComponentRef} from '@angular/core';

export default class DialogRef {

    /**
     * The reference of the dialog content component
     */
    contentRef: ComponentRef<any>;

    _promise : Promise<any>;
    _resolve: Function;
    _reject: Function;

    public DialogRef() {
        this._promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });

    }
    
    

}