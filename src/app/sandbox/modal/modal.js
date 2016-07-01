"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var modal_settings_1 = require('./modal-settings');
var modalComponent_1 = require('./modalComponent');
var dialog_ref_1 = require('./dialog-ref');
var modal_open_context_1 = require("./modal-open-context");
var alert_dialog_component_1 = require("./alert-dialog-component");
var confirm_dialog_component_1 = require("./confirm-dialog-component");
// import { Observable, Subject } from 'rxjs/Rx';
/**
 * Modal service.
 *
 * Allow to open modal popin
 */
var Modal = (function () {
    function Modal(componentResolver, injector) {
        this.componentResolver = componentResolver;
        this.injector = injector;
        this._dialogStack = [];
    }
    /**
     * Opens an alert modal with given options.
     *
     * @param options
     * @return {Promise<boolean>}
     */
    Modal.prototype.alert = function (options) {
        var openContext = new modal_open_context_1.default();
        openContext.componentType = alert_dialog_component_1.default;
        openContext.context = options;
        return this._openModal(openContext).promise;
    };
    /**
     * Opens an confirm modal with given options.
     *
     * @param options
     * @return {Promise<boolean>}
     */
    Modal.prototype.confirm = function (options) {
        var openContext = new modal_open_context_1.default();
        openContext.componentType = confirm_dialog_component_1.default;
        openContext.context = options;
        return this._openModal(openContext).promise;
    };
    /**
     * Opens a popin for given componentType and options.
     *
     * @param componentType
     * @param dialogOptions
     * @return {Promise<boolean>}
     */
    Modal.prototype.open = function (componentType, dialogOptions) {
        var openContext = new modal_open_context_1.default();
        openContext.componentType = componentType;
        openContext.context = dialogOptions;
        return this._openModal(openContext).promise;
    };
    Modal.prototype._openModal = function (context) {
        var _this = this;
        var dialogRef = new dialog_ref_1.default();
        var bindings = core_1.ReflectiveInjector.resolve([
            { provide: modal_open_context_1.default, useValue: context },
            { provide: Modal, useValue: this },
            { provide: dialog_ref_1.default, useValue: dialogRef },
            { provide: modal_settings_1.default, useValue: new modal_settings_1.default() }
        ]);
        var modalInjector = core_1.ReflectiveInjector.fromResolvedProviders(bindings, this.injector);
        this.componentResolver.resolveComponent(modalComponent_1.default).then(function (factory) {
            var modalRef = _this.defaultViewContainer.createComponent(factory, _this.defaultViewContainer.length, modalInjector);
            dialogRef.modalRef = modalRef;
            _this._dialogStack.push(dialogRef);
            dialogRef.onDestroy.subscribe(function () {
                _this._onDialogDestroy(dialogRef);
            });
        });
        return dialogRef;
    };
    Modal.prototype._onDialogDestroy = function (dialogRef) {
        console.log("on dialog destroy !");
    };
    Modal = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_1.ComponentResolver, core_1.Injector])
    ], Modal);
    return Modal;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Modal;
//# sourceMappingURL=modal.js.map