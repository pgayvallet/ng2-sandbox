import {Component, ViewChild, ViewContainerRef, AfterViewInit} from '@angular/core';
import DialogRef from './dialog-ref';
import ModalSettings from './modal-settings';
import ModalOpenContext from "./modal-open-context";
import ComponentUtils from "../utils/ComponentUtils";

@Component({
    selector: 'modal-container',
    template: `
        <div>Ceci est mon modal container qui est cool lol</div>
        <div #dialogContent></div>
    `,
    directives: [],
    providers : [ComponentUtils]
})
export default class ModalContainer implements AfterViewInit {

    @ViewChild('dialogContent', {read: ViewContainerRef}) private _viewContainer: ViewContainerRef;

    constructor(private openContext : ModalOpenContext<any>,
                private dialog      : DialogRef<any>,
                private settings    : ModalSettings,
                private componentUtils : ComponentUtils) {
        console.log("constructor !");
    }

    ngAfterViewInit() {
        this.componentUtils.instanciate(this.openContext.componentType, this._viewContainer).then(componentRef => {
           this.dialog.contentRef = componentRef;
        });
    }

}
