import {Type} from '@angular/core';


export default class ModalOpenContext<T> {

    /**
     * The component type to use to open the modal
     */
    public componentType : Type;

    /**
     * The type of the context
     */
    public context : T;

}