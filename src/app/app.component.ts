import {Component, ViewContainerRef} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {CONSTANTS} from './shared';
import {Tabset} from './sandbox/tabset/tabset';
import modalOpener from './sandbox/modal/modalOpener';
import DummyModal from './sandbox/dummyModalExample';

@Component({
    selector: 'as-main-app',
    templateUrl: 'app/app.html',
    directives: [NavbarComponent, ROUTER_DIRECTIVES, Tabset],
    providers : [modalOpener]
})
export class AppComponent {
    public appBrand: string;
    
    constructor(private modalOpener : modalOpener, private _vc : ViewContainerRef) {
        this.appBrand = CONSTANTS.MAIN.APP.BRAND;
        console.log("_vc = :" + this._vc)
    }
    
    openTestModal() {

        this.modalOpener.defaultViewContainer = this._vc;

        console.log("lala");
        this.modalOpener.openConfirm({ title : "hello", text : "hihi", componentType : DummyModal}).then(status => {
            console.log("popin closed. status = " + status);
        });
    }
    
}
