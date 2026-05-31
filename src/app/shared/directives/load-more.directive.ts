import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core'

@Directive({
  selector: '[load-more]'
})
export class LoadMoreDirective {
  @Input() element: string = null
  @Input() appendTo: string = null
  @Output() loadMore = new EventEmitter()

  @HostListener('click', ['$event'])
  onScroll(event) {
    let el: HTMLDivElement = null
    switch (this.element) {
      case 'treeSelect': {
        el = this.appendTo ? document.getElementsByClassName('p-treeselect-items-wrapper')?.[0] : this._hostElement.nativeElement.getElementsByClassName('p-treeselect-items-wrapper')?.[0]
        break
      }
      case 'dropdown': {
        el =
          this.appendTo
            ? document.getElementsByClassName('p-select-items-wrapper')?.[0] || document.getElementsByClassName('p-dropdown-items-wrapper')?.[0]
            : this._hostElement.nativeElement.getElementsByClassName('p-select-items-wrapper')?.[0] || this._hostElement.nativeElement.getElementsByClassName('p-dropdown-items-wrapper')?.[0]
        break
      }
      case 'select': {
        el =
          this.appendTo
            ? document.getElementsByClassName('p-select-items-wrapper')?.[0] || document.getElementsByClassName('p-dropdown-items-wrapper')?.[0]
            : this._hostElement.nativeElement.getElementsByClassName('p-select-items-wrapper')?.[0] || this._hostElement.nativeElement.getElementsByClassName('p-dropdown-items-wrapper')?.[0]
        break
      }
      case 'autoComplete': {
        el = this.appendTo ? document.getElementsByClassName('p-autocomplete-panel')?.[0] : this._hostElement.nativeElement.getElementsByClassName('p-autocomplete-panel')?.[0]
        break
      }
    }
    el.onscroll = () => {
      if (el.scrollTop + el.clientHeight + 50 > el.scrollHeight) {
        this.loadMore.emit()
      }
    }
  }

  constructor(private _hostElement: ElementRef) {}
}
