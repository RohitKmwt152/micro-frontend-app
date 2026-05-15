import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-react-wrapper',
  standalone: false,
  template: `<div #reactContainer></div>`,
})
export class ReactWrapperComponent
  implements AfterViewInit, OnDestroy {
  @Input() remoteUrl!: string;

  @Input() module!: string;

  @ViewChild('reactContainer', { static: true })
  container!: ElementRef;

  private unmountFn: any;
  private originalStyles: Element[] = [];

  // Cache inserted styles globally so they aren't lost permanently on unmount
  private static remoteStylesCache: { [url: string]: Element[] } = {};

  async ngAfterViewInit() {
    // Snapshot the currently loaded styles in the head BEFORE doing anything
    this.originalStyles = Array.from(document.querySelectorAll('head style, head link[rel="stylesheet"]'));

    // If we have cached styles for this React app from a previous visit, re-inject them!
    if (ReactWrapperComponent.remoteStylesCache[this.remoteUrl]) {
      ReactWrapperComponent.remoteStylesCache[this.remoteUrl].forEach(el => document.head.appendChild(el));
    }

    try {
      const remoteModule = await import(
        /* @vite-ignore */ this.remoteUrl
      );

      const factory = await remoteModule.get(this.module);

      const Module = factory();

      Module.mount(this.container.nativeElement);

      this.unmountFn = Module.unmount;
    } catch (error) {
      console.error('Failed to load remote module', error);
    }
  }

  ngOnDestroy() {
    this.unmountFn?.();

    // Find all styles that were injected while this component was active
    const currentStyles = Array.from(document.querySelectorAll('head style, head link[rel="stylesheet"]'));
    const remoteStyles = currentStyles.filter(el => !this.originalStyles.includes(el));

    // Save them to our static cache
    ReactWrapperComponent.remoteStylesCache[this.remoteUrl] = remoteStyles;

    // Remove them from DOM safely to protect Angular
    remoteStyles.forEach(el => el.remove());
  }
}