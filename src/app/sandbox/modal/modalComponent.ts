import {Component,ViewChild, ViewContainerRef, ComponentResolver, AfterViewInit} from '@angular/core';
import DialogRef from './dialog-ref';
import ModalOptions from './modalOptions';

@Component({
    selector: 'modal-container',
    template: `
        <div>Ceci est mon modal container qui est cool lol</div>
        <div #dialogContent></div>
    `,
    directives: [],
    providers : []
})
export default class ModalContainer implements AfterViewInit {

    @ViewChild('dialogContent', {read: ViewContainerRef}) private _viewContainer: ViewContainerRef;

    constructor(private dialog : DialogRef,
                private options : ModalOptions,
                private _cr : ComponentResolver) {
        console.log("constructor !")
    }

    ngAfterViewInit() {
        // PGA : not working, probably because we append it to the dom instead of adding it to a view.
        console.log("after view init !");
        this._cr.resolveComponent(this.options.componentType).then(factory => {

            console.log("after factory init !");

            let contentRef = this._viewContainer.createComponent(factory, this._viewContainer.length, this._viewContainer.parentInjector);
            this.dialog.contentRef = contentRef;
        });
    }

}
