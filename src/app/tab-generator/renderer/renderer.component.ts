import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    Input,
    OnDestroy,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';

@Component({
    selector: 'app-renderer',
    template: `<div #target></div>`
})
export class RendererComponent implements AfterViewInit, OnDestroy {

    @ViewChild('target', { read: ViewContainerRef }) target: any;

    @Input() component: any;
    @Input() tab: any;

    cmpRef!: ComponentRef<any>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private cdRef: ChangeDetectorRef
    ) { }

    ngAfterViewInit(): void {
        this.updateComponent();
    }

    updateComponent(): void {
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
        const factory = this.componentFactoryResolver.resolveComponentFactory(this.component);
        this.cmpRef = this.target.createComponent(factory);
        this.cmpRef.instance.title = this.tab.title;
        this.cmpRef.instance.icon = this.tab.icon;
        // this.compRef.instance.someOutput.subscribe(val => doSomething())
        this.cdRef.detectChanges();
    }

    ngOnDestroy(): void {
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
    }
}
