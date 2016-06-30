import { Injector, Injectable, ComponentResolver, ReflectiveInjector, ViewContainerRef} from '@angular/core';
import ModalOptions from './modalOptions';
import ModalComponent from './modalComponent';
import DialogRef from './dialog-ref';

import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export default class ModalOpener {
    
    public defaultViewContainer: ViewContainerRef;
    

    constructor(private componentResolver : ComponentResolver, private injector : Injector) {}

    openConfirm(options : ModalOptions) : Promise<boolean> {

        console.log("openConfirm -> "  + options.title, options.componentType);

        let emitter : Subject<boolean> = new Subject<boolean>();

        //Observable.
        //emitter.next(false);
        //emitter.complete();
        
        let dialogRef = new DialogRef();

        let bindings = ReflectiveInjector.resolve([
            {provide: ModalOpener, useValue: this},
            {provide: DialogRef, useValue: dialogRef},
            // {provide: ModalCompileConfig, useValue: compileConfig}
            {provide: ModalOptions, useValue: options}
        ]);
        const modalInjector = ReflectiveInjector.fromResolvedProviders(bindings, this.injector);

        this.componentResolver.resolveComponent(ModalComponent).then( (factory) => {

            this.defaultViewContainer.createComponent(factory, this.defaultViewContainer.length, modalInjector);

            //let modalPopinRef = factory.create(modalInjector, null, null);
            //document.body.appendChild(modalPopinRef.location.nativeElement);
        });

        window.setTimeout(() => {
           emitter.next(true);
            //emitter.complete();
        }, 200);
        




        return emitter.toPromise();
    }


    /*
    openModal(options : ModalOptions) {

    }
    */

    
}