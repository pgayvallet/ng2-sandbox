import { Type, Injector, Injectable, ReflectiveInjector, ViewContainerRef} from '@angular/core';
import ModalSettings from './modal-settings';
import ModalComponent from './modalComponent';
import DialogRef from './dialog-ref';
import AlertDialogOptions from "./alert-dialog-options";
import ConfirmDialogOptions from "./confirm-dialog-options";
import ModalOpenContext from "./modal-open-context";
import AlertDialogComponent from "./alert-dialog-component";
import ConfirmDialogComponent from "./confirm-dialog-component";
import ComponentUtils from "../utils/ComponentUtils";

// import { Observable, Subject } from 'rxjs/Rx';

/**
 * Modal service.
 *
 * Allow to open modal popin
 */
@Injectable()
export default class Modal {
    
    private _dialogStack: DialogRef<any>[] = [];

    // This is required to be injected before use, as there is no way to access the root element view container ref otherwise.
    public defaultViewContainer: ViewContainerRef;

    constructor(private componentUtils : ComponentUtils,
                private injector : Injector) {
    }

    /**
     * Opens an alert modal with given options.
     *
     * @param options
     * @return {Promise<boolean>}
     */
    alert(options : AlertDialogOptions) : Promise<boolean> {
        let openContext = new ModalOpenContext<AlertDialogOptions>();
        openContext.componentType = AlertDialogComponent;
        openContext.context = options;
        return this._openModal(openContext).promise;
    }

    /**
     * Opens an confirm modal with given options.
     *
     * @param options
     * @return {Promise<boolean>}
     */
    confirm(options : ConfirmDialogOptions) : Promise<boolean> {
        let openContext = new ModalOpenContext<AlertDialogOptions>();
        openContext.componentType = ConfirmDialogComponent;
        openContext.context = options;
        return this._openModal(openContext).promise;
    }

    /**
     * Opens a popin for given componentType and options.
     *
     * @param componentType
     * @param dialogOptions
     * @return {Promise<boolean>}
     */
    open<T>(componentType : Type, dialogOptions : T) : Promise<boolean> {
        let openContext = new ModalOpenContext<T>();
        openContext.componentType = componentType;
        openContext.context = dialogOptions;
        return this._openModal(openContext).promise;
    }

    private _openModal<T>(context : ModalOpenContext<T>) : DialogRef<T> {
        let dialogRef = new DialogRef<T>();
        let bindings = ReflectiveInjector.resolve([
            {provide: ModalOpenContext, useValue : context},
            {provide: Modal, useValue: this},
            {provide: DialogRef, useValue: dialogRef},
            {provide: ModalSettings, useValue: new ModalSettings()}
        ]);
        const modalInjector = ReflectiveInjector.fromResolvedProviders(bindings, this.injector);

        this.componentUtils.instanciate(ModalComponent, this.defaultViewContainer, modalInjector).then(modalRef => {
            dialogRef.modalRef = modalRef;
            this._onDialogAdd(dialogRef);
            dialogRef.onDestroy.subscribe(() => {
                this._onDialogDestroy(dialogRef);
            });
        });

        return dialogRef;
    }

    private _onDialogAdd(dialogRef : DialogRef<any>) : void {
        this._dialogStack.push(dialogRef);
        if(this._dialogStack.length === 1) {
            
        }

    }
    
    private _onDialogDestroy(dialogRef : DialogRef<any>) : void {
        console.log("on dialog destroy !")
        
    }

    private _showOverlay() : void{

    }

    private _removeOverlay() : void {
        
    }


    
}