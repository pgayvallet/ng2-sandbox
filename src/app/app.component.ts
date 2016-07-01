import {Component, ViewContainerRef} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {CONSTANTS} from './shared';
import {Tabset} from './sandbox/tabset/tabset';
import Modal from './sandbox/modal/modal';

@Component({
    selector: 'as-main-app',
    templateUrl: 'app/app.html',
    directives: [NavbarComponent, ROUTER_DIRECTIVES, Tabset],
    providers : [Modal]
})
export class AppComponent {
    public appBrand: string;
    
    constructor(private modal : Modal, private _vc : ViewContainerRef) {
        this.appBrand = CONSTANTS.MAIN.APP.BRAND;
    }
    
    openTestModal() {

        this.modal.defaultViewContainer = this._vc;

        this.modal.confirm({ title : "hello", text : "hihi" }).then( (status) => {
            console.log("confirm popin closed. status = " + status);
        });
    }
    
}
