import {Component,ViewChild, ViewContainerRef, ComponentResolver, AfterViewInit} from '@angular/core';
import DialogRef from './dialog-ref';
import ModalSettings from './modal-settings';
import ModalOpenContext from "./modal-open-context";

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

    constructor(private openContext : ModalOpenContext<any>,
                private dialog      : DialogRef<any>,
                private settings    : ModalSettings,
                private _cr         : ComponentResolver) {
        console.log("constructor !");
    }

    ngAfterViewInit() {
        console.log("after view init !");
        this._cr.resolveComponent(this.openContext.componentType).then(factory => {

            console.log("after factory init !");

            let contentRef = this._viewContainer.createComponent(factory, this._viewContainer.length, this._viewContainer.parentInjector);
            this.dialog.contentRef = contentRef;
        });
    }

}
