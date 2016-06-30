import {Component} from '@angular/core';
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
    
    constructor(private modalOpener : modalOpener) {
        this.appBrand = CONSTANTS.MAIN.APP.BRAND;
    }
    
    openTestModal() {
        console.log("lala");
        this.modalOpener.openConfirm({ title : "hello", text : "hihi", componentType : DummyModal}).then(status => {
            console.log("popin closed. status = " + status);
        });
    }
    
}
