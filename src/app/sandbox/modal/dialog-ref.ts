import {ComponentRef} from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

export default class DialogRef {

    /**
     * The reference of the ModalComponent of this dialog
     */
    public modalRef : ComponentRef<any>;
    /**
     * The reference of the dialog content component
     */
    public contentRef: ComponentRef<any>;

    private _onDestroy: Subject<void>  = new Subject<void>();
    public onDestroy: Observable<void> = this._onDestroy.asObservable();
    
    public promise : Promise<any>;
    
    private _resolve: Function;
    private _reject: Function;

    public DialogRef() {
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
        this._reject();
        this._destroy();
    }

    private _destroy() {
        this._onDestroy.next(null);
        this._onDestroy.complete();
    }
    
}