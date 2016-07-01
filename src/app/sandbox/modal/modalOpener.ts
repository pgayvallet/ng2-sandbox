import { Injector, Injectable, ComponentResolver, ReflectiveInjector, ViewContainerRef} from '@angular/core';
import ModalOptions from './modalOptions';
import ModalComponent from './modalComponent';
import DialogRef from './dialog-ref';

// import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export default class ModalOpener {

    private _dialogStack: DialogRef[] = [];

    // This is required to be injected before use, as there is no way to access the root element view container ref otherwise.
    public defaultViewContainer: ViewContainerRef;

    constructor(private componentResolver : ComponentResolver,
                private injector : Injector) {
    }

    openConfirm(options : ModalOptions) : Promise<boolean> {

        let dialogRef = new DialogRef();
        let bindings = ReflectiveInjector.resolve([
            {provide: ModalOpener, useValue: this},
            {provide: DialogRef, useValue: dialogRef},
            // {provide: ModalCompileConfig, useValue: compileConfig}
            {provide: ModalOptions, useValue: options}
        ]);
        const modalInjector = ReflectiveInjector.fromResolvedProviders(bindings, this.injector);

        return this.componentResolver.resolveComponent(ModalComponent).then( (factory) => {
            let modalRef = this.defaultViewContainer.createComponent(factory, this.defaultViewContainer.length, modalInjector);
            dialogRef.modalRef = modalRef;
            this._dialogStack.push(dialogRef);
            dialogRef.onDestroy.subscribe(() => {
                this._onDialogDestroy(dialogRef);
            });
        }).then( () => {
           return dialogRef.promise;
        });
    }

    
    private _onDialogDestroy(dialogRef : DialogRef) : void {
        
    }

    /*
    openModal(options : ModalOptions) {

    }
    */

    
}