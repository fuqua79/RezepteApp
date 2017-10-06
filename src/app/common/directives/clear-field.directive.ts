import {Directive, ElementRef, Renderer, Input, OnChanges} from '@angular/core';

@Directive({
    selector: '[appClearField]'
})
export class ClearFieldDirective {
    @Input() inputArg = 0;

    constructor(private elementRef: ElementRef,
                private renderer: Renderer) {
    }

    ngOnChanges(change : any) {
        //this.renderer.set
      //cument.getElementById("textfield1").value = "";
      this.renderer.setElementProperty(this.elementRef.nativeElement, "value", "" );
    }

}
