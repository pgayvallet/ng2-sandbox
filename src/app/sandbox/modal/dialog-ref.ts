import {ComponentRef} from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

export default class DialogRef<T> {

    /**
     * The reference of the ModalComponent of this dialog
     */
    public modalRef : ComponentRef<any>;
    /**
     * The reference of the dialog content component
     */
    public contentRef: ComponentRef<any>;

    /**
     * The context of the dialog, aka the input given by the opener.
     */
    public context : T;

    private _onDestroy: Subject<void>  = new Subject<void>();
    public onDestroy: Observable<void> = this._onDestroy.asObservable();

    /**
     * The promise of the dialog, resolving or rejecting when the dialog is either close or dismissed.
     */
    public promise : Promise<any>;
    
    private _resolve: Function;
    private _reject: Function;

    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }

    close(result: any = null) {
        this._resolve(result);
        this._destroy();
    }

    dismiss() {
        this._reject(null);
        this._destroy();
    }

    private _destroy() {
        this._onDestroy.next(null);
        this._onDestroy.complete();
    }
    
}