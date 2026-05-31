import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[icon-name]',
  host: {class: 'material-symbols-outlined'}
})
export class IconDirective implements OnInit {
  @Input('icon-name') text!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setProperty(this.el.nativeElement, 'innerText', this.text||'');
  }
}
