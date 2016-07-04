import {Type, Injectable, ComponentRef, ViewContainerRef, Injector, ComponentResolver} from "@angular/core";

@Injectable()
export default class ComponentUtils {

    constructor(private componentResolver : ComponentResolver) {}

    /**
     *
     * @param componentType
     * @param viewContainer
     * @param injector
     *
     * @return {null}
     */
    public instanciate(componentType : Type, viewContainer : ViewContainerRef, injector : Injector = null) : Promise<ComponentRef<any>> {
        let componentRef;
        return this.componentResolver.resolveComponent(componentType).then(factory => {
             componentRef = viewContainer.createComponent(factory, viewContainer.length, injector || viewContainer.parentInjector);
        }).then(() => {
            return componentRef;
        });
    }

}
